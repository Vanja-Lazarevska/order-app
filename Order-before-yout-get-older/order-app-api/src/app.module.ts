import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsMoule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { CartProductModule } from './cart-product/cart-product.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ProductsMoule,
    CartModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123456',
      database: 'e-commerce',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CartProductModule,
    OrderModule,
      ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
