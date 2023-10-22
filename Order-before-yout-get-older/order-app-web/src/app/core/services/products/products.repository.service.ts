import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "src/app/shared/interfaces/product.interface";
import { HttpHeaders } from '@angular/common/http'
import { CartProduct } from "src/app/shared/interfaces/cart.interface";

@Injectable({
    providedIn: 'root'
})
export class ProductsRepositoryService {

    private readonly URL = 'http://localhost:3000/products'
    constructor(private readonly httpClient: HttpClient){}

    getProducts = async () => {
        return this.httpClient.get<Product[]>(this.URL)
    }

    getProductsAuth =  () => {
        const token = localStorage.getItem('user')

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          })

        return this.httpClient.get<CartProduct[]>(`${this.URL}/auth`, {headers: headers})
    }

    
    getProductsbyCategory = async (category: string) => {
        return this.httpClient.get<Product[]>(`${this.URL}/${category}`)
    }

    createProduct = async (product: Product) => {
        return this.httpClient.post<Product>(`${this.URL}/add-product`, product)
    }

    deleteProduct = (productId: number) => {
        return this.httpClient.delete(`${this.URL}/${productId}` )
    }

    updateProduct = async(productId: number, product:Product) => {
        const token = localStorage.getItem('user')

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          })

        return this.httpClient.put(`${this.URL}/${productId}`, product, {headers: headers})
    }

    getProductById = (productId:number) => {
        return this.httpClient.get<Product>(`${this.URL}/edit/${productId}`)
    }
 
}