import {
    Controller,
    Get,
    Post,
    Param,
    Body,
  } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { Order } from 'src/interfaces/order.interface';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService){}

    @Post()
    async createOrder (@Body() orderDto: Order) {
       const order =  await this.orderService.createOrder(orderDto)
        return order
    }

    @Get('/:token')
    async getOrders(@Param('token') token: string) {
        const orders = await this.orderService.getOrders(token)
        return orders
    }
}
