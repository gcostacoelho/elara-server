import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { UserModule } from './user.module';
import { UserController } from 'src/controllers/user.controller';
import { AuthModule } from './auth.module';
import { ListModule } from './list.module';
import { ListController } from 'src/controllers/list.controller';

@Module({
    imports: [UserModule, AuthModule, ListModule]
})

export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).exclude(
            { path: "users/add", method: RequestMethod.POST },
        ).forRoutes(UserController, ListController);
    }
}
