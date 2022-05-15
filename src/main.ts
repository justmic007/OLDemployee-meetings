import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Employee Meetings')
    .setDescription('The Employee Meetings API description')
    .setVersion('2.0')
    .addTag('employee-meetings')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('employee-meetings', app, document);
  await app.listen(3000);
}
bootstrap();
