import { Injectable } from '@angular/core';
import { OrderDto } from 'src/app/shared/interfaces/order.interface';
import { OrdersRepositoryService } from './orders-repository.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private readonly ordersRepository: OrdersRepositoryService) { }

  createOrder = (orderDto: OrderDto) => {
    return this.ordersRepository.createOrderOfUser(orderDto)
  }

  getOrders = () => {
    const token = localStorage.getItem('user') ?? ''
    return this.ordersRepository.getOrders(token)
  }

}
