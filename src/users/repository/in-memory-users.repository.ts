import { Injectable } from '@nestjs/common';
import fs from 'node:fs';

import { User, Users } from '../interfaces/user.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InMemoryUsersRepository {
  private users: Users = {};

  constructor(private readonly configService: ConfigService) {
    const dataFilePath =
      this.configService.get<string>('MOCK_USERS_DATA_PATH') || '';

    this.users = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8')) as Users;
  }

  getAllUsers(): Users {
    return this.users;
  }

  getUserById(id: string): User | null {
    return this.users[id] || null;
  }
}
