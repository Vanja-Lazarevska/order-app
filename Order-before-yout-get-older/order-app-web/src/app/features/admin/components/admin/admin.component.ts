import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { BehaviorSubject, tap } from 'rxjs';
import { CartProduct } from 'src/app/shared/interfaces/cart.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{

  allProducts: CartProduct[]
  private $refreshData = new BehaviorSubject<boolean>(false)
  constructor(private readonly productsService: ProductsService){}


  ngOnInit(): void {
    this.$refreshData
    .pipe(tap(data => {
      this.productsService.getAllProductsAuth()
      this.productsService._productsAuth.subscribe((data)=> {
        this.allProducts = data
      })
    }))
    .subscribe()
    
  }
    addToProduct: boolean = true

  toggleAddToProduct = () => {
    this.addToProduct = !this.addToProduct
  }

  getAllProducts(){
    this.$refreshData.next(true)
  }
}
