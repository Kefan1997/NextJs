import { Injectable } from '@nestjs/common';
import fs from 'node:fs';

import { User, Users } from '../interfaces/user.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InMemoryUsersRepository {
  private users: Users = {};
  private dataFilePath: string;

  constructor(private readonly configService: ConfigService) {
    this.dataFilePath =
      this.configService.get<string>('MOCK_USERS_DATA_PATH') || '';

    this.users = JSON.parse(
      fs.readFileSync(this.dataFilePath, 'utf-8'),
    ) as Users;
  }

  getAllUsers(): Users {
    return this.users;
  }

  getUserById(id: string): User | null {
    return this.users[id] || null;
  }

  createUser(user: User): User {
    this.users[user.id] = user;

    fs.writeFileSync(this.dataFilePath, JSON.stringify(this.users, null, 2));

    return user;
  }

  updateUser(id: string, userObj: Partial<User>): User | null {
    const user = this.users[id];

    if (!user) {
      return null;
    }

    const updatedUser = { ...user, ...userObj };
    this.users[id] = updatedUser;

    fs.writeFileSync(this.dataFilePath, JSON.stringify(this.users, null, 2));

    return updatedUser;
  }

  deleteUser(id: string): User | null {
    const user = this.users[id];

    if (!user) {
      return null;
    }

    delete this.users[id];

    fs.writeFileSync(this.dataFilePath, JSON.stringify(this.users, null, 2));

    return user;
  }
}
