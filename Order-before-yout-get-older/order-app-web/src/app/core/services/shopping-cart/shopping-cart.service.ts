import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, switchMap, tap } from 'rxjs';
import { CartProduct, DecrementInQuantity } from 'src/app/shared/interfaces/cart.interface';
import { ShoppingCartRepositoryService } from './shopping-cart-repository.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  userOrders: BehaviorSubject<CartProduct[]> = new BehaviorSubject<CartProduct[]>([])
  numberOfAllOrders: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  quantityOfEachUserProduct: Subject<DecrementInQuantity> = new Subject<DecrementInQuantity>()
  deleted: BehaviorSubject<string> = new BehaviorSubject<string>('')

  constructor(private readonly cartRepository: ShoppingCartRepositoryService) {}

  decrementProductInCart (productId: number, cartId:number) {
    this.cartRepository.decrementProductInCart(productId, cartId).pipe(switchMap((data)=> {
      this.quantityOfEachUserProduct.next(data)
      return this.cartRepository.getNumberOfOrders(+cartId)
    })).subscribe((data)=> this.numberOfAllOrders.next(data))
  
  }

  private  create ()  {
   return this.cartRepository.create()
  }

   cartCreateOrGet () {
    let cartIdOfUser = localStorage.getItem('cartId')
   
    if(!cartIdOfUser) {
      return this.create().pipe(
        tap((data) => {
          localStorage.setItem('cartId', data.toString())
        })
      )
    }  else {
      return +cartIdOfUser 
    } 
  }

   createOrder (productId: number) {
    let cartIdFromMethod =  this.cartCreateOrGet()
    if (typeof cartIdFromMethod ===  'number'){
      this.cartRepository.createOrder(productId, cartIdFromMethod).subscribe((data) => {
        this.getNumberOfOrders()

      } )  
    }else{
      cartIdFromMethod.pipe(
        switchMap((data) => {
          return this.cartRepository.createOrder(productId, data)
        })
      ).subscribe((data)=> {
        this.getNumberOfOrders()
      })
    }
  }

    getOrderOfUser () {
    const id = localStorage.getItem('cartId');
    if(!id) {
      return {
        message: 'No cartId'
      }
    } else {
        this.cartRepository.getUserOrder(+id).subscribe(data=> {
        this.userOrders.next(data)
      } )
    }
    return
  }

  getNumberOfOrders () {
    const cartId = localStorage.getItem('cartId')
    if(!cartId){
      this.numberOfAllOrders.next(0)
    }else {
      this.cartRepository.getNumberOfOrders(+cartId).subscribe((data)=> this.numberOfAllOrders.next(data))
    }
  }

  deleteAllCart () {
    const cartId = localStorage.getItem('cartId')!
    this.cartRepository.deleteAllCart(+cartId).pipe(switchMap((data)=> {
      this.deleted.next(data.message)
      return this.cartRepository.getNumberOfOrders(+cartId)
    })).subscribe((data)=> this.numberOfAllOrders.next(data)) 
  }
}
