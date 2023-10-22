import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity } from 'src/entities/orders.entity';
import { UsersModule } from 'src/users/users.module';
import { CartModule } from 'src/cart/cart.module';
import { CartProductModule } from 'src/cart-product/cart-product.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersEntity]), CartModule, UsersModule, CartProductModule],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
