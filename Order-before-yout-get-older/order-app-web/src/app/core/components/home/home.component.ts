import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  products: Product[] = []
  categories: string[]=[ 'Electronics','Clothing', 'Books','Sports']


  constructor(private readonly productsService: ProductsService){}

  ngOnInit(): void {
    this.productsService.getAllProducts()
    this.productsService._products.subscribe({
      next: (data) => {
        this.products = data
      }
    })
    }




 

}
