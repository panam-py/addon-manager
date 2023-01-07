import { Global, Module } from '@nestjs/common';
// import { BrandModule } from '../brand/brand.module';
import { AddonService } from './addon.service';

@Global()
@Module({
  // imports: [BrandModule],
  providers: [AddonService],
  exports: [AddonService],
})
export class AddonModule {}
