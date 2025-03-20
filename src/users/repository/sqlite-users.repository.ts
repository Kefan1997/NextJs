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

  createUser(user: User): User {
    const stmt = db.prepare(
      'INSERT INTO users (id, name, email, age) VALUES (?, ?, ?, ?)',
    );
    stmt.run(user.id, user.name, user.email, user.age);

    return user;
  }

  updateUser(id: string, userObj: Partial<User>): User | null {
    console.log('id', id);
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    const user = stmt.get(id) as User | undefined;

    if (!user) {
      return null;
    }

    const updatedUser = { ...user, ...userObj };

    const updateStmt = db.prepare(
      'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
    );
    updateStmt.run(updatedUser.name, updatedUser.email, updatedUser.age, id);

    return updatedUser;
  }

  deleteUser(id: string) {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);

    if (!user) {
      return null;
    }

    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    stmt.run(id);

    return { message: 'User deleted successfully', id };
  }
}
