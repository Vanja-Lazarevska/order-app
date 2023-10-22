import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductService } from 'src/cart-product/cart-product.service';
import { CartEntity } from 'src/entities/cart.entity';
import { Cart } from 'src/interfaces/cart.interface';
import { ProductService } from 'src/products/products.service';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {

    constructor(@InjectRepository(CartEntity) private readonly cartRepository: Repository<CartEntity>){}

    async createCart (cart: Cart) {
   
        const newCart = this.cartRepository.create(cart)
        const savedCart = await this.cartRepository.save(newCart)
        return savedCart.id

    }


    async getCartOfUser (cartId: number) {
        const cart = await this.cartRepository.findOne({where:{id: cartId}})
        return cart

    }

}

