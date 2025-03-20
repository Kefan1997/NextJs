import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { validate } from 'uuid';

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().required(),
});

@Injectable()
export class ValidateUser implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { error } = userSchema.validate(req.body, { abortEarly: false });

    if (error) {
      throw new BadRequestException('Missing required fields');
    }

    next();
  }
}

@Injectable()
export class ValidateUserId implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    if (!validate(id)) {
      throw new BadRequestException('Invalid user Id Format');
    }

    next();
  }
}
