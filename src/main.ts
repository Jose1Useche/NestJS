import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const app = await NestFactory.create(AppModule, { cors: true });
  
  // app.enableCors();

  // app.enableCors({
  //   origin: ['http://localhost:3000/', 'http://localhost:8080/']
  // });

  app.use(json({ limit: '10mb' }));

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('El titulo de la documentacion')
    .setDescription('Breve descripción')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('awards')
    .addTag('courses')
    .addTag('videos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('my-documentation', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
