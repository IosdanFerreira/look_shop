import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserPayload } from './models/userPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/userToken';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthRepository } from './repositories/auth.repository';
import { AuthEntity } from './entities/auth.entity';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly repository: AuthRepository,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async validateUser(email: string, password: string) {
    const existingUser = await this.repository.findUserByEmail(email);

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

    throw new Error('Email ou senha inválidos');
  }

  signUp(createAuthDto: CreateAuthDto) {
    return this.repository.signUp(createAuthDto);
  }

  login(user: AuthEntity): UserToken {
    // Transforma um user em um JWT
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    // Gera o token de acesso e o refresh token
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, this.refreshTokenConfig);

    return {
      ...user,
      accessToken,
      refreshToken,
    };
  }

  refresh(user: AuthEntity) {
    // Transforma um user em um JWT
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    // Gera o token de acesso e o refresh token novamente
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, this.refreshTokenConfig);

    return {
      accessToken,
      refreshToken,
    };
  }
}
