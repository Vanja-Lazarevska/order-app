import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from 'src/app/shared/interfaces/cart.interface';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart/shopping-cart.service';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit{

  displayedColumns: string[] = ['position','name', 'quantity', 'price per product', 'total price', 'delete', 'edit' ];
  
  totalPrice :number;
  @Input()
  editShowed: boolean
  
  @Input()
  eachOrder: CartProduct[]  = []

  @Output()
  productDeleted = new EventEmitter<boolean>()

  constructor(
    private readonly productService: ProductsService, 
    private readonly cartService: ShoppingCartService, 
    private readonly router: Router
    ) {}

  ngOnInit(): void {
    if(!this.editShowed) {
      this.displayedColumns.splice(6, 1)
    } else {
      return
    }
  }

  handleTotalPrice (element: CartProduct) {
    this.totalPrice = (element.quantity ? element.quantity * element.price  : element.price) 
    return this.totalPrice
  }

  handleSumOfOrders () {
    if(this.eachOrder.length !== 0) {
      return this.eachOrder.map((order) => order.price * order.quantity).reduce((p, c)=> p + c)
    }
    return 0
  }


  handleDelete =(elementId: number, element: CartProduct) => {
    const cartId = localStorage.getItem('cartId')
    this.cartService.quantityOfEachUserProduct.subscribe((data)=>{ 

      if(data.cart.products.id == elementId) {
        element.quantity = data.cart.quantity 
      }
     })
    if(!cartId) {
      return 'No cart id'
    }
    return this.cartService.decrementProductInCart(elementId, +cartId )
  }

  handleDeleteFromDb = (productId: number) => {
    this.productService.deleteProduct(productId).subscribe()
    this.productDeleted.emit(true)
  }

  handleEdit = (id: number) => {
    this.router.navigate(['/admin/edit-product/', id])
  }
}
