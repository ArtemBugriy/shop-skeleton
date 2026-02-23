import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { OrmService } from '@infrastructure/database/orm.service';

@Injectable()
export class CategoryService {
  constructor(private readonly orm: OrmService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.orm.category.create({
      data: createCategoryDto,
    });
  }

  findAll() {
    return this.orm.category.findMany();
  }

  findOne(id: number) {
    return this.orm.category.findUnique({ where: { id: id } });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.orm.category.update({
      where: { id: id },
      data: updateCategoryDto,
    });
  }

  remove(id: number) {
    return this.orm.category.delete({ where: { id: id } });
  }
}
