import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from 'src/entities/cart.entity';
import { ProductsMoule } from 'src/products/products.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
    imports: [TypeOrmModule.forFeature([CartEntity]), ProductsMoule],
    providers: [CartService],
    controllers: [CartController],
    exports: [CartService]
    
})
export class CartModule {}
