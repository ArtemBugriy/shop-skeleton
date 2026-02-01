import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OrmService } from './orm.service';
import { ProductModule } from './product/product.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';

@Module({
  imports: [UserModule, ProductModule, HealthcheckModule],
  controllers: [AppController],
  providers: [AppService, OrmService],
})
export class AppModule {}
