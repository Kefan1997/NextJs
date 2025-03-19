import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { InMemoryUsersRepository } from './in-memory-users.repository';
import { SQLiteUsersRepository } from './sqlite-users.repository';

@Injectable()
export class UsersRepository {
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
    return this.repository.getUserById(id);
  }
}
