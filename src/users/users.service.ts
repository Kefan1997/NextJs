import { Injectable } from '@nestjs/common';
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
    return this.usersRepository.getUserById(id);
  }

  createUser(user: User) {
    user.id = uuidv4();
    return this.usersRepository.createUser(user);
  }

  updateUser(id: string, user: User) {
    return this.usersRepository.updateUser(id, user);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
