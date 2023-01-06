import { Global, Module } from '@nestjs/common';
import { AddonController } from './addon.controller';
import { AddonService } from './addon.service';

@Global()
@Module({
  controllers: [AddonController],
  providers: [AddonService],
})
export class AddonModule {}
