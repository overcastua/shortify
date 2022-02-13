import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkRepository } from './link.repository';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';

@Module({
  imports: [TypeOrmModule.forFeature([LinkRepository])],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
