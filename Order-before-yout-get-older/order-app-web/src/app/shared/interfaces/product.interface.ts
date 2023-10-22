import { CartProduct } from "./cart.interface";

export interface Product {
    id: number,
    name: string,
    description: string,
    price:number,
    category: string,
    imageUrl: string,
    stock: number,
}

export interface ProductOrdered {
    quantity: number;
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    stock: number;
    cartProduct: CartProduct[];
}