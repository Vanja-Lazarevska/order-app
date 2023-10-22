import { ICartProduct } from 'src/interfaces/cart-product.interface';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CartEntity } from './cart.entity';
import { ProductEntity } from './products.entity';

@Entity('cart-product')
export class CartProduct implements ICartProduct {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @ManyToOne(
        () => ProductEntity,
        productEntity => productEntity.cartProduct, {onDelete: "CASCADE"})
      products: ProductEntity;
    
      @ManyToOne(
        () => CartEntity,
        cartEntity => cartEntity.cartProduct, {onDelete: "CASCADE"})
      carts: CartEntity;

    
}
