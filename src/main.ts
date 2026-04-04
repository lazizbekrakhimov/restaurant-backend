import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as fs from 'fs';

async function main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const uploadDirs = ['uploads/products', 'uploads/news', 'uploads/galleries', 'uploads/avatars', 'uploads/temp'];
  uploadDirs.forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  app.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/uploads' });

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      process.env.FRONTEND_URL || '',
    ].filter(Boolean),
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Restaurant API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, config));

  const port = process.env.PORT || 4004;
  await app.listen(port);

  console.log(`Server: http://localhost:${port}`);
  console.log(`Swagger: http://localhost:${port}/api`);
}

main();