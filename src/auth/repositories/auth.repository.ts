import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { AuthEntity } from '../entities/auth.entity';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Método para criação de usuários
  async signUp(authDto: CreateAuthDto) {
    const { password } = authDto;

    // Deleta a senha informada no corpo da requisição para que ela não seja passada adiante sem criptografia
    delete authDto.password;

    // Substitui a senha informada pelo hash criptografado
    const data: Prisma.UserCreateInput = {
      ...authDto,
      password: await bcrypt.hash(password, 10),
    };

    // Cria o novo usuário no banca de dados
    const createdUser = await this.prisma.user.create({
      data,
    });

    return createdUser;
  }

  // Método para buscar usuários pelo email
  async findUserByEmail(email: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }
}
