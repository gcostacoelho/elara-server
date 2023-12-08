import { SearchModule } from './search.module';
import { HistoricModule } from './historic.module';
import { TaskModule } from './task.module';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { UserModule } from './user.module';
import { UserController } from '../controllers/user.controller';
import { AuthModule } from './auth.module';
import { ListModule } from './list.module';
import { ListController } from '../controllers/list.controller';
import { TaskController } from '../controllers/task.controller';
import { HistoricController } from '../controllers/historic.controller';
import { SearchController } from '../controllers/search.controller';

@Module({
    imports: [
        SearchModule,
        HistoricModule,
        TaskModule,
        UserModule,
        AuthModule,
        ListModule
    ]
})

export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).exclude(
            { path: "user/add", method: RequestMethod.POST },
        ).forRoutes(UserController, ListController, TaskController, HistoricController, SearchController);
    }
}
