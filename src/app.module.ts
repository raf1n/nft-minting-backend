import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NftModule } from './modules/nft/nft.module';
import { NftEntity } from './modules/nft/entities/nft.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        entities: [NftEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    NftModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
