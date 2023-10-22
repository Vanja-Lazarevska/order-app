import { Module } from '@nestjs/common';
import { CartProductService } from './cart-product.service';
import { CartProductController } from './cart-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProduct } from 'src/entities/cart_products.entity';
import { CartModule } from 'src/cart/cart.module';
import { ProductsMoule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartProduct]), CartModule, ProductsMoule],
  providers: [CartProductService],
  controllers: [CartProductController],
  exports: [CartProductService]
})
export class CartProductModule {}
