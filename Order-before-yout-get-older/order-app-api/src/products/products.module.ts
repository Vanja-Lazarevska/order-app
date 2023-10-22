import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProductEntity } from 'src/entities/products.entity';
import { ProductController } from './product.controller';
import { ProductService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), AuthModule],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService]
})
export class ProductsMoule {}
