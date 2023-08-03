import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
    dotenv.config();

    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Elara server')
        .setDescription('Endpoints for provide a services to Elara')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Authorization', 'Endpoints for generate and validate a token')
        .addTag('User', 'Endpoints for settings to the users')
        .addTag('List', 'Endpoints for manage lists')
        .addTag('Task', 'Endpoints for manage task in the lists')
        .addTag('Historic', 'Endpoints for read and delete historic from user')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();
