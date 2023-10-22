import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  title: string 
  productsByCategory: Product[] = []
  category: string


  constructor(
    private readonly productsService: ProductsService, 
    private readonly router:ActivatedRoute
    ){}

  ngOnInit(): void {
    this.router.params.subscribe((data)=> {
      this.category = data['category']
      this.title = this.category 
    })

    this.productsService.getProductsByCategory(this.category)
     this.productsService._productsByCategory.subscribe((data)=> {
      this.productsByCategory = data
    })

    }

  }



