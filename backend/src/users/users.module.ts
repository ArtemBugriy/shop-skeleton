import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { OrmService } from '../orm.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, OrmService],
})
export class UsersModule {}
