import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { AuthEntity } from '../entities/auth.entity';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async signUp(authDto: CreateAuthDto) {
    const { password } = authDto;

    delete authDto.password;

    const data: Prisma.UserCreateInput = {
      ...authDto,
      password: await bcrypt.hash(password, 10),
    };

    const createdUser = await this.prisma.user.create({
      data,
    });

    return createdUser;
  }

  async findUserByEmail(email: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }
}
