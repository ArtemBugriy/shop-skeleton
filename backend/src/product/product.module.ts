import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { OrmService } from '../orm.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, OrmService],
})
export class ProductModule {}
