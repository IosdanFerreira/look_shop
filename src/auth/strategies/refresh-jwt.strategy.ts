import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPayload } from '../models/userPayload';
import { UserFromJwt } from '../models/userFromJwt';
import { ConfigType } from '@nestjs/config';
import refreshJwtConfig from '../config/refresh-jwt.config';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private readonly refreshJwtConfiguration: ConfigType<
      typeof refreshJwtConfig
    >,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: refreshJwtConfiguration.secret,
    });
  }

  async validate(payload: UserPayload): Promise<UserFromJwt> {
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  }
}
