import { Module } from '@nestjs/common';
import { UserModule } from '@modules/user/user.module';
import { ProductModule } from '@modules/product/product.module';
import { HealthcheckModule } from '@modules/healthcheck/healthcheck.module';
import { CategoryModule } from '@modules/category/category.module';

@Module({
  imports: [UserModule, ProductModule, HealthcheckModule, CategoryModule],
})
export class AppModule {}
