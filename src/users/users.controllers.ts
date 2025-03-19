import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    try {
      const users = this.usersService.getAllUsers();
      return users;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    try {
      const user = this.usersService.getUserById(id);

      return user;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  createUser(@Body() user: User) {
    try {
      this.usersService.createUser(user);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  updateUser(@Param('id') id: string, @Body() user: User) {
    try {
      const updatedUser = this.usersService.updateUser(id, user);

      if (!updatedUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    try {
      const deletedUser = this.usersService.deleteUser(id);

      if (!deletedUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
