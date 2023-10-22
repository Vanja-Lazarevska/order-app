import { CartEntity } from "src/entities/cart.entity";
import { CartProduct } from "src/entities/cart_products.entity";
import { UsersEntity } from "src/entities/users.entity";

export interface Order {
    timeOfOrder: Date
    shipping: string,
    cart: number,
    user: number
}

export interface OrderToSave {
    timeOfOrder: Date;
    shipping: string;
    cart: CartEntity;
    user : UsersEntity;
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
export interface OrderDetails {
    timeOfOrder: Date;
    shipping: string;
    nameOfUser:string;
    lnameOfUser: string;
    products: ProductOrdered[];
}