import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { UsersRepository } from './repository/users.repository';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getAllUsers() {
    return this.usersRepository.getAllUsers();
  }

  getUserById(id: string) {
    const user = this.usersRepository.getUserById(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  createUser(user: User) {
    user.id = uuidv4();
    return this.usersRepository.createUser(user);
  }

  updateUser(id: string, user: User) {
    const updatedUser = this.usersRepository.updateUser(id, user);

    if (!updatedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return updatedUser;
  }

  deleteUser(id: string) {
    const deletedUser = this.usersRepository.getUserById(id);

    if (!deletedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return deletedUser;
  }
}
