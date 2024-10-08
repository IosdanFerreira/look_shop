import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { password } = createUserDto;

    delete createUserDto.password;

    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(password, 10),
    };

    const createdUser = await this.prisma.user.create({
      data,
    });

    return createdUser;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }
}
