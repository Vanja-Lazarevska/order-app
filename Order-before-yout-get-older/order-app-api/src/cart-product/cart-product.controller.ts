import { Body, Controller, Post } from '@nestjs/common';
import { Delete, Get, Param, Patch } from '@nestjs/common/decorators';
import { BodyDto } from 'src/interfaces/cart.interface';
import { CartProductService } from './cart-product.service';

@Controller()
export class CartProductController {

    constructor(private readonly cartProductService: CartProductService){}

    @Get('/cart/:cartId/product/:productId')
    async decrementProductQuantity (@Param('productId') productId: number, @Param('cartId') cartId: number) {
        const cart = await this.cartProductService.decrementProductQuantity(productId,cartId)
        return cart
    }


    @Post('/cart/order')
    async createOrder (@Body() bodyDto: BodyDto) {
        const {productId, cartId} = bodyDto
        const newOrder = await this.cartProductService.createOrder(productId, cartId)
        return newOrder

    }

    @Get('/cart/products/:id')
    async getProductsOrdered (@Param('id') cartId: string) {
       const products = await this.cartProductService.getProductsOrdered(cartId)
       return products
    }

    @Get('/cart/:id/count')
    async getNumberOfOrders(@Param('id') cartId: number) {
        const qunatity = await this.cartProductService.getNumberOfOrders(cartId)
        return qunatity

    }

    @Delete('/cart/:cartId')
    async deleteAllCart(@Param('cartId') cartId: number) {
        const deleted = await this.cartProductService.deleteAllCart(cartId)
        return deleted
    }

    
}
