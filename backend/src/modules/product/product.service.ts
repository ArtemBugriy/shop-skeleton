import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { OrmService } from '@infrastructure/database/orm.service';

@Injectable()
export class ProductService {
  constructor(private readonly orm: OrmService) {}

  create(createProductDto: CreateProductDto) {
    return this.orm.product.create({
      data: createProductDto,
    });
  }

  findAll() {
    return this.orm.product.findMany();
  }

  findOne(id: number) {
    return this.orm.product.findUnique({ where: { id: id } });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.orm.product.update({
      where: { id: id },
      data: updateProductDto,
    });
  }

  remove(id: number) {
    return this.orm.product.delete({ where: { id: id } });
  }
}
