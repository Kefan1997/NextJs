import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { User } from './interfaces/user.interface';
import { ConfigService } from '@nestjs/config';
import { InMemoryUsersRepository } from './repository/in-memory-users.repository';
import { SQLiteUsersRepository } from './repository/sqlite-users.repository';

@Injectable()
export class UsersService {
  private repository: InMemoryUsersRepository | SQLiteUsersRepository;

  constructor(
    private readonly inMemoryRepo: InMemoryUsersRepository,
    private readonly sqliteRepo: SQLiteUsersRepository,
    private readonly configService: ConfigService,
  ) {
    const storageType =
      this.configService.get<string>('DATA_STORAGE') || 'sqlite';
    this.repository =
      storageType === 'memory' ? this.inMemoryRepo : this.sqliteRepo;
  }

  getAllUsers() {
    return this.repository.getAllUsers();
  }

  getUserById(id: string) {
    const user = this.repository.getUserById(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  createUser(user: User) {
    user.id = uuidv4();
    return this.repository.createUser(user);
  }

  updateUser(id: string, user: User) {
    const updatedUser = this.repository.updateUser(id, user);

    if (!updatedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return updatedUser;
  }

  deleteUser(id: string) {
    const deletedUser = this.repository.getUserById(id);

    if (!deletedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return deletedUser;
  }
}
