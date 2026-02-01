import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { OrmService } from '../orm.service';

@Injectable()
export class UserService {
  constructor(private readonly orm: OrmService) {}

  create(createUserDto: CreateUserDto) {
    return this.orm.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.orm.user.findMany();
  }

  findOne(id: number) {
    return this.orm.user.findUnique({ where: { id: id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.orm.user.update({
      where: { id: id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.orm.user.delete({ where: { id: id } });
  }
}
