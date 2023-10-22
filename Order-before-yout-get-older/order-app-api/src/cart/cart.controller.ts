import {
    Controller,
    Get,
    Post,
    Param,
    Body,
  } from '@nestjs/common';
import { Cart } from 'src/interfaces/cart.interface';
import { CartService } from './cart.service';


@Controller('cart')
export class CartController {

    constructor(private readonly cartService: CartService){}
    
    @Post()
    async createCart (@Body() cart: Cart) {
        const newCart = await this.cartService.createCart(cart)
        return newCart

    }

    @Get('/:cartId')
    async getOrderOfUser(@Param('cartId') cartId: number) {
        const cart = await this.cartService.getCartOfUser(cartId)
        return cart

    }

}
