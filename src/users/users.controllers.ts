import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import LogService from '../logging/log.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logService: LogService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  getAllUsers() {
    try {
      this.logService.info('Fetching users...');

      const users = this.usersService.getAllUsers();

      this.logService.info('Users fetched successfully', users);

      return users;
    } catch (error) {
      this.logService.error('Error fetching users', error);

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'id', description: 'User ID' })
  getUserById(@Param('id') id: string) {
    try {
      this.logService.info(`Fetching user by id:${id}...`);

      const user = this.usersService.getUserById(id);

      this.logService.info('User fetched successfully', user);

      return user;
    } catch (error) {
      this.logService.error('Error fetching user', error);

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    schema: {
      example: { name: 'John Doe', email: 'john@example.com', age: 30 },
    },
  })
  createUser(@Body() user: User) {
    try {
      this.logService.info('Creating user...');

      const newUser = this.usersService.createUser(user);

      this.logService.info('User created successfully', newUser);

      return newUser;
    } catch (error) {
      this.logService.error('Error creating user', error);

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  updateUser(@Param('id') id: string, @Body() user: User) {
    try {
      this.logService.info('Updating user...');

      const updatedUser = this.usersService.updateUser(id, user);

      this.logService.info('User updated successfully', updatedUser);

      return updatedUser;
    } catch (error) {
      this.logService.error('Error updating user', error);

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  deleteUser(@Param('id') id: string) {
    try {
      this.logService.info(`Deleting user with userId: ${id}...`);

      this.usersService.deleteUser(id);

      this.logService.info(`User with userId: ${id} deleted successfully`);

      return { message: 'User deleted successfully', id };
    } catch (error) {
      this.logService.error('Error deleting user', error);

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
