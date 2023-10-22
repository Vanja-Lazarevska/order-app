import { User } from 'src/interfaces/user.interface';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrdersEntity } from './orders.entity';

@Entity('users')
export class UsersEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lname: string;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;


  @OneToMany(() => OrdersEntity, order => order.user)
  orders : OrdersEntity[];
}
