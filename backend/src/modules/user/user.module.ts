import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { OrmService } from '@infrastructure/database/orm.service';

@Module({
  controllers: [UserController],
  providers: [UserService, OrmService],
})
export class UserModule {}
