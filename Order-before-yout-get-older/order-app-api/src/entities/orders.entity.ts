import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CartEntity } from './cart.entity';
import { UsersEntity } from './users.entity';

@Entity('orders')
export class OrdersEntity  {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    timeOfOrder: Date;

    @Column()
    shipping: string;

    @OneToOne(() => CartEntity, cart => cart.id)
    @JoinColumn({foreignKeyConstraintName: 'cartId'}) 
    cart: CartEntity;

    @ManyToOne(() => UsersEntity, user => user.id ,{ onDelete: "CASCADE"})
    @JoinColumn({foreignKeyConstraintName: 'id'})
    user : UsersEntity;
    }
