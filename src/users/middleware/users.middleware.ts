import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { validate } from 'uuid';

@Injectable()
export class ValidateUser implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { name, email, age } = req.body as {
      name: string;
      email: string;
      age: number;
    };

    if (!name || !email || typeof age !== 'number') {
      throw new BadRequestException('Missing required fields');
    }

    next();
  }
}

@Injectable()
export class ValidateUserId implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.body as { userId: string };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (!validate(userId)) {
      throw new BadRequestException('Invalid user Id Format');
    }

    next();
  }
}
