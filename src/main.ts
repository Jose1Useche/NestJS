import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
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
