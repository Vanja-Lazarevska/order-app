import { OrdersEntity } from "src/entities/orders.entity";

export interface User {
    id: number,
    username: string,
    password: string
}
export interface IUser { 
    id: number;
    name: string;
    lname: string;
    username: string;
    password: string;
    orders : OrdersEntity[]; 
}

export interface UserRegister {
    name:string,
    lname: string,
    username: string,
    password: string
}

export interface UserToSave {
    username: string,
    password: string
}