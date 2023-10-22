import { Component, DoCheck, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart/shopping-cart.service';
import { CartProduct } from 'src/app/shared/interfaces/cart.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, DoCheck{

  title: string = 'My Orders'
  orderedProducts: CartProduct[] = []

  constructor(private readonly cartService: ShoppingCartService ){}

  ngDoCheck(): void {
    this.cartService.userOrders.subscribe((data)=> {
      data.forEach((order) => {
        if(order.quantity === 0) {
          this.cartService.getOrderOfUser()
        }
      })
      this.orderedProducts = data    
    })  
  }

  ngOnInit(): void {
    this.cartService.getOrderOfUser()
  }

   handleDeleteCart () {
    this.cartService.deleteAllCart()

    this.cartService.deleted.subscribe((data)=> {
      if(data) {
        this.cartService.getOrderOfUser()
      }
    })}

}
