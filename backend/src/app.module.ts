import { Module } from '@nestjs/common';
import { UserModule } from '@modules/user/user.module';
import { ProductModule } from '@modules/product/product.module';
import { HealthcheckModule } from '@modules/healthcheck/healthcheck.module';

@Module({
  imports: [UserModule, ProductModule, HealthcheckModule],
})
export class AppModule {}
