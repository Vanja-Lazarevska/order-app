import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDetails, OrderDto } from 'src/app/shared/interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersRepositoryService {
  
  private readonly URL = 'http://localhost:3000/order'

  constructor(private readonly httpClient: HttpClient) { }


  createOrderOfUser = (orderData: OrderDto) => {
    return this.httpClient.post(this.URL, orderData)
  }

  getOrders = (token: string) => {
    return this.httpClient.get<OrderDetails[]>(`${this.URL}/${token}`)
  }


}
