import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { OrdersService } from 'src/app/core/services/orders/orders.service';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart/shopping-cart.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})

export class CheckOutComponent implements OnInit{

  constructor(
    private readonly cartService: ShoppingCartService,
    private readonly orderService: OrdersService,
    private readonly userService: UsersService,
    private readonly router: Router
    ){}

  productsOrdered: Product[]
  ngOnInit(): void {
    this.initForm()
    this.cartService.userOrders.subscribe((data)=> this.productsOrdered = data)
  }

  checkOutForm: FormGroup

  initForm = () => {
    this.checkOutForm = new FormGroup({
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required)
    })
  }

  handleSubmitForm () {
    const token = localStorage.getItem('user')
    const cartId = localStorage.getItem('cartId')
    this.userService.getUserId(token)
    this.userService.userId.pipe(map(data => {
      
      const {address, city, country}  = this.checkOutForm.value
      const checkOut = {
        timeOfOrder: new Date(),
        shipping: `${address},${city},${country}`, 
        cart: cartId,
        user: data
     }
     return checkOut
     
     }),switchMap((dataReturned) => {
      return this.orderService.createOrder(dataReturned)}))
      .subscribe((data =>{
        this.router.navigate(['my-orders'])
      }))
  }

}
