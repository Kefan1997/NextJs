import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controllers';
import { UsersService } from './users.service';
import { UsersRepository } from './repository/users.repository';
import { InMemoryUsersRepository } from './repository/in-memory-users.repository';
import { SQLiteUsersRepository } from './repository/sqlite-users.repository';
import { ConfigModule } from '@nestjs/config';
import { ValidateUserId } from './middleware/users.middleware';

@Module({
  imports: [ConfigModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    InMemoryUsersRepository,
    SQLiteUsersRepository,
  ],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateUserId).forRoutes('users/:id');
  }
}
