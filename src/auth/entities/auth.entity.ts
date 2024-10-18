import { User } from '@prisma/client';

export class AuthEntity implements User {
  name: string;
  id: number;
  email: string;
  password: string;
  admin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
