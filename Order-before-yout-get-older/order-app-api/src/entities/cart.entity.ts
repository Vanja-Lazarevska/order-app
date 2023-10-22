import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartProduct } from './cart_products.entity';

@Entity('cart')
export class CartEntity  {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    createdAt: Date;

    @OneToMany(
        () => CartProduct,
        cartProduct => cartProduct.carts)
        cartProduct: CartProduct[];
    }
