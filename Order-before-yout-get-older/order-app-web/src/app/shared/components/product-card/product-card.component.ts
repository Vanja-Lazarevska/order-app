import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],

})
export class ProductCardComponent {

  @Input()
  product: Product 

  myOrder: Product

  constructor(private readonly cartService: ShoppingCartService){}

  handleClickOrder =  (productId: number) => {  
    this.cartService.createOrder(productId)  
  }
}
