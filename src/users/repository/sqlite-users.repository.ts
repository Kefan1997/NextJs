import { Injectable } from '@nestjs/common';

import { Users, User } from '../interfaces/user.interface';
import db from '../db/database';

@Injectable()
export class SQLiteUsersRepository {
  getAllUsers() {
    const usersArray = db.prepare('SELECT * FROM users').all() as User[];

    const usersObject: Users = usersArray.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {} as Users);

    return usersObject;
  }

  getUserById(id: string) {
    return db
      .prepare('SELECT * FROM users WHERE id = ?')
      .get(id) as User | null;
  }
}
