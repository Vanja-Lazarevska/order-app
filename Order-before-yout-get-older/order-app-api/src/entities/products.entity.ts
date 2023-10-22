import { Product } from 'src/interfaces/product.interface';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartProduct } from './cart_products.entity';

@Entity('products')
export class ProductEntity implements Product {
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  category: string;

  @Column()
  imageUrl: string;

  @Column()
  stock: number;

  @OneToMany(
    () => CartProduct, 
    cartProduct => cartProduct.products)
    cartProduct: CartProduct[];

}
