import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserPayload } from './models/userPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/userToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const existingUser = await this.userService.findUserByEmail(email);

    if (existingUser) {
      // Checa se a senha informada na requisição corresponde ao hash que está no banco
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password,
      );

      //Se a senha for válida, exclui do objeto a ser retornado a senha informada no corpo requisição e retorna um objeto com os dados do usuário
      if (isPasswordValid) {
        delete existingUser.password;

        return {
          ...existingUser,
        };
      }
    }

    // Caso o usuário não exista, retorna um erro genérico
    throw new Error('Email ou senha inválidos');
  }

  login(user: UserEntity): UserToken {
    // Transforma um user em um JWT
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      ...user,
      accessToken: jwtToken,
    };
  }
}
