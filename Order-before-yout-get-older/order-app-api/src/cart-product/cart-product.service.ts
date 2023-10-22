import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { CartProduct } from 'src/entities/cart_products.entity';
import { ProductOrdered } from 'src/interfaces/order.interface';
import { ProductService } from 'src/products/products.service';
import { Repository } from 'typeorm';

@Injectable()
export class CartProductService {
    constructor(
        @InjectRepository(CartProduct) private readonly cartProductRepository: Repository<CartProduct>, 
        private readonly productService: ProductService, 
        private readonly cartSerivce: CartService
        ){}


    async decrementProductQuantity(productId:number, cartId:number) {
        const cart = await this.cartSerivce.getCartOfUser(cartId)
        const product = await this.productService.getProductById(productId)
        const cartIdFromCartProduct = await this.cartProductRepository.find({where: {carts:cart, products: product}, relations:['products']})
        const quantity = cartIdFromCartProduct.map((order)=> order.quantity = order.quantity - 1)[0]
        
        if(quantity === 0) {
            const deleteFromDb = await this.cartProductRepository.delete({id: cartIdFromCartProduct[0].id})
            return {
                message: 'Deleted from db',
                cart: cartIdFromCartProduct[0]
            }
        }
        const updatedOrder: CartProduct = {
            ...cartIdFromCartProduct[0],
            quantity: quantity
        }

        const saved = await this.cartProductRepository.save(updatedOrder)
        return {
            message: 'Quantity decreased',
            cart: updatedOrder
        }
    }

    async createOrder(productId: number, cartId: number) {
        const cart = await this.cartSerivce.getCartOfUser(cartId)
        if (!cart) {
            throw new NotFoundException(`Cart  with id ${cartId} not found`);
        }
        const product = await this.productService.getProductById(productId)
        
        const isProductInCart = await this.cartProductRepository.findOne({where: {products: product, carts: cart}})
        if(isProductInCart) {
            const order = await this.cartProductRepository.preload({
                ...isProductInCart,
                quantity: isProductInCart.quantity + 1
            })
    
            const updatedCart = await this.cartProductRepository.save(order)
            
            return {
                message: 'Quantity increased',
                cart: updatedCart
            }
        }
        const newOrder = this.cartProductRepository.create({
            products: product,
            carts: cart,
            quantity: 1 
        })
        const newCart = await this.cartProductRepository.save(newOrder)
        return {
            message: 'Added to cart',
            cart: newCart
        }
    }

    async getProductsOrdered(cartId: string): Promise<ProductOrdered[]> {
        const findCart = await this.cartSerivce.getCartOfUser(+cartId)
        const products = await this.cartProductRepository.find({where: {carts: findCart}, relations: ['products']})
       const productReturned = products.map((data)=> {
        return {
            ...data.products,
            quantity: data.quantity
        }
       })
       return productReturned
     
    }
    async getNumberOfOrders (cartId: number) {
        const cart = await this.cartSerivce.getCartOfUser(cartId)
        const numberOfOrders = await this.cartProductRepository.find({where: {carts:cart}})
        return numberOfOrders.map((data)=> data.quantity).reduce((prevValue, currValue)=> prevValue + currValue, 0)

    }

    async deleteAllCart (cartId: number) {
        const cart = await this.cartSerivce.getCartOfUser(cartId)
        const deleteFromDb = await this.cartProductRepository.delete({carts: cart})
        return {
            message: 'Deleted from Db',
            cart: deleteFromDb
        }

    }


}
