import { ProductOrdered } from "./product.interface";

export interface OrderDto {
    cart: string | null,
    shipping: string,
    timeOfOrder: Date,
    user: number
}

export interface OrderNode {
    name: string;
    children?: OrderNode[];
}

export interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}

export interface OrderDetails {
    timeOfOrder: Date;
    shipping: string;
    nameOfUser:string;
    lnameOfUser: string;
    products: ProductOrdered[];

}