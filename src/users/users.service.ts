import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getAllUsers() {
    return this.usersRepository.getAllUsers();
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }
}
