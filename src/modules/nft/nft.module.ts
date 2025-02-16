import { Module } from '@nestjs/common';
import { NftService } from './nft.service';
import { NftController } from './nft.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftEntity } from './entities/nft.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NftEntity])],
  controllers: [NftController],
  providers: [NftService],
})
export class NftModule {}
