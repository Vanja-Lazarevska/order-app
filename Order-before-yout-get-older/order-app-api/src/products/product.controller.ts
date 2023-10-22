import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Body,
  Put
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { Product } from 'src/interfaces/product.interface';
import { ProductService } from './products.service';


@Controller()
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get('/products')
  async getProducts() {
    const products = await this.productsService.getAllProducts()
    return  products
  };
  
  @Post('/products/add-product')
  async createProduct(@Body() product:Product) {
    const newProduct = await this.productsService.createProduct(product)
    return {
      message: 'Product added'
    }
  }


  @Get('/products/auth') 
  // @UseGuards(AuthGuardGuard) 
  @UseGuards(JwtAuthGuard)
  async getProductsAuth() {
    const products = await this.productsService.getAllProductsAuth()
    return products
  };
  
  @Get('/products/:category')
  async getByCategory(@Param('category') params: string) {
    const productByCategory = await this.productsService.getProductByCategory(params)
    return productByCategory
  }

  @Get('/products/edit/:id')
  async getProductById(@Param('id') productId: number) {
    const product =await this.productsService.getProductById(productId)
    return product
  }


  @Delete('/products/:id')
  async deleteProduct(@Param('id')productId: number) {
    const deletedProduct = await this.productsService.deleteProduct(productId)
    return {
      message: 'Product deleted'
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/products/:id')
  async updateProduct(@Param('id') id:number, @Body() body: Product){
      const idOfProduct = await this.productsService.updateProduct(id, body)

      return {
          message: 'Product was updated',
          id: idOfProduct
      }
  }

}
