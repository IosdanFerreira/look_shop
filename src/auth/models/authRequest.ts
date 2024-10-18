import { Request } from 'express';
import { AuthEntity } from '../entities/auth.entity';

export interface AuthRequest extends Request {
  user: AuthEntity;
}
