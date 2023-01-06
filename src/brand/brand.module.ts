import { Global, Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';

@Global()
@Module({
  providers: [BrandService],
  controllers: [BrandController],
})
export class BrandModule {}
