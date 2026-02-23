import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { OrmService } from '@infrastructure/database/orm.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, OrmService],
})
export class CategoryModule {}
