import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from 'src/middleware/auth/auth.middleware';
import { UserModule } from './user.module';
import { UserController } from 'src/controllers/user.controller';
import { AuthModule } from './auth.module';

@Module({
    imports: [UserModule, AuthModule]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(UserController);
    }
}
