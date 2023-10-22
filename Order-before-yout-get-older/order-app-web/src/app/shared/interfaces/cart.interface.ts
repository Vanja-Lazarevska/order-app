import { Product } from "./product.interface";

export interface Cart {
    id:number;
    createdAt: Date;
    products: Product
}

export interface CartProduct {
    id: number,
    name: string,
    description: string,
    price:number,
    category: string,
    imageUrl: string,
    stock: number,
    quantity: number,
    
}

export interface CreatedProduct {
    cart: {
        id: number, 
        quantity: number
    },
    message : string
}

export interface DecrementInQuantity {
    message: string,
    cart: DeleteCartProduct
}

export interface DeleteCartProduct extends CartProduct{
    products: Product
}
export interface DeleteCart {
    message: string,
    cart: CartProduct
}