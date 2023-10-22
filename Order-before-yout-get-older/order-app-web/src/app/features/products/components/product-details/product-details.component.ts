import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{

  product: Product

  @Input()
  name: string
  @Input()
  description: string
  @Input()
  price: string
  @Input()
  imageUrl: string
  @Input()
  inStock: string
  constructor(
    private readonly router: ActivatedRoute,
    private readonly productService: ProductsService
    ){}


  ngOnInit(): void {
    this.router.params.subscribe(params => {
      const productId = +params['id']
      this.product = this.productService.findById(productId)
    })
  }
}
