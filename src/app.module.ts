import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LogModule } from './logging/log.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, LogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
