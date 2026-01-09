import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrmService } from './orm.service';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService, OrmService],
})
export class AppModule {}
