import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('NFT Minting API')
    .setDescription('API for storing and retrieving NFT data')
    .setVersion('1.0')
    .addTag('NFT')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // app.enableCors({
  //   origin: '*',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   allowedHeaders: 'Content-Type,Authorization',
  // });

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
