import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/uploads', });

  app.enableCors({ origin: 'http://localhost:3000', credentials: true, });

  const config = new DocumentBuilder()
    .setTitle('Restaurant API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, config));

  await app.listen(process.env.PORT || 4004);

  console.log(`Server running on port 4004: http://localhost:${process.env.PORT || 4004}`);
  console.log(`Swagger: http://localhost:${process.env.PORT || 4004}/api`);
}

main();