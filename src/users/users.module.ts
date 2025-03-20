import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controllers';
import { UsersService } from './users.service';
import { InMemoryUsersRepository } from './repository/in-memory-users.repository';
import { SQLiteUsersRepository } from './repository/sqlite-users.repository';
import { ConfigModule } from '@nestjs/config';
import { ValidateUser, ValidateUserId } from './middleware/users.middleware';

@Module({
  imports: [ConfigModule],
  controllers: [UsersController],
  providers: [UsersService, InMemoryUsersRepository, SQLiteUsersRepository],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateUserId)
      .forRoutes({ path: 'users/:id', method: RequestMethod.ALL });

    consumer
      .apply(ValidateUser)
      .forRoutes({ path: 'users', method: RequestMethod.POST });
  }
}
