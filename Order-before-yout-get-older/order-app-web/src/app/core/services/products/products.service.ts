import {  Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartProduct } from 'src/app/shared/interfaces/cart.interface';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ProductsRepositoryService } from './products.repository.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly productsRepository: ProductsRepositoryService) {}

  _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([])
  _productsAuth: BehaviorSubject<CartProduct[]> = new BehaviorSubject<CartProduct[]>([])
  _productsByCategory: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([])

  getAllProducts = async () => {
    (await this.productsRepository.getProducts()).subscribe({
      next: (data: Product[]) => {
        this._products.next(data)
      },
      error: (error) => {console.log(error)}  
    })
  }

  getAllProductsAuth = () => {
    this.productsRepository.getProductsAuth().subscribe({
      next: (data: CartProduct[]) => {
        this._productsAuth.next(data)
      },
      error: (error) => {console.log(error)}  
    })
  }

  getProductsByCategory = async (category: string) => {
    (await this.productsRepository.getProductsbyCategory(category)).subscribe({
      next: (data: Product[]) => {
        this._productsByCategory.next(data)
      },
      error: (error) => {console.log(error)}
    })
  }

  deleteProduct = (productId: number) => {
   return this.productsRepository.deleteProduct(productId)
  }

  getProductById = (productId: number) => {
   return this.productsRepository.getProductById(productId)
  }

  findById = (productId: number): Product  => {
    const foundProduct= this._products.getValue().find((product)=> product.id === productId)
 
    if(!foundProduct){
     console.log('No order')
    }
    return foundProduct as Product
 
   }

  updateProduct = async (productId:number, productBody: Product) =>{
    (await this.productsRepository.updateProduct(productId, productBody)).subscribe()
  }

  addProductInDb = async (product: Product) => {
    (await this.productsRepository.createProduct(product)).subscribe()
    }
   
      
   }

