import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductService } from 'src/cart-product/cart-product.service';
import { CartService } from 'src/cart/cart.service';
import { OrdersEntity } from 'src/entities/orders.entity';
import { Order, OrderDetails, OrderToSave } from 'src/interfaces/order.interface';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
    constructor(@InjectRepository(OrdersEntity) private readonly orderRepository: Repository<OrdersEntity>,
    private readonly cartService: CartService, 
    private readonly userService: UsersService,
    private readonly cartProductService: CartProductService
    ) {}

    async createOrder (orderDto: Order) {
        const user = await this.userService.findUserById(orderDto.user)
        const cart = await this.cartService.getCartOfUser(orderDto.cart)

        const orderdToCreate: OrderToSave = {
            ...orderDto,
            user: user,
            cart: cart
        }

        const order = this.orderRepository.create(orderdToCreate)
        await this.orderRepository.save(order)
        return {
            message: 'Order is saved'
        }

    }

    async getOrders(token: string) {
        if(!token){
            throw new Error('No token provided')

        }
        const userId = await this.userService.getUserId(token)

        const orders = await this.orderRepository.find({where: {user: userId}, relations: ['cart', 'user']})
        const orderDetails =Promise.all(orders.map(async (order)=> {
           const allProducts = this.cartProductService.getProductsOrdered((order.cart.id).toString())
           const returnedOrder: OrderDetails ={
            timeOfOrder: order.timeOfOrder,
            shipping: order.shipping,
            nameOfUser: order.user.name,
            lnameOfUser: order.user.lname,
            products: await allProducts
           }
           return returnedOrder
        }))

        return  await orderDetails
    }
}
