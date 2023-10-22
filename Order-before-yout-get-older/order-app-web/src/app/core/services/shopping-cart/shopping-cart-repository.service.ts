import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  CartProduct, CreatedProduct, DecrementInQuantity, DeleteCart } from 'src/app/shared/interfaces/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartRepositoryService {
  private readonly URL = 'http://localhost:3000/cart'

  constructor(private readonly httpClient: HttpClient) { }

  decrementProductInCart = (productId: number, cartId: number) => {
    return this.httpClient.get<DecrementInQuantity>(`${this.URL}/${cartId}/product/${productId}`)
  }

  create ()  {
    const newCart = {
      createdAt: new Date()
    }
   return this.httpClient.post<number>(this.URL, newCart)
  }

  createOrder =  (productId: number, cartId: number) => {
    const body = {productId, cartId}
    return this.httpClient.post<CreatedProduct>(`${this.URL}/order`, body)
  }

  getUserOrder =   (orerId: number) => {
    return this.httpClient.get<CartProduct[]>(`${this.URL}/products/${orerId}`)
  }

  getNumberOfOrders = (cartId: number)  => {
    return this.httpClient.get<number>(`${this.URL}/${cartId}/count`)
  }

  deleteAllCart = (cartId: number) => {
    return this.httpClient.delete<DeleteCart>(`${this.URL}/${cartId}`)
  }

 




}
