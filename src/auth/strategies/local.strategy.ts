import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
// EStratégia de autenticação local(email e senha)
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Configura o campo de login para ser o email (em vez do padrão 'username')
    super({ usernameField: 'email' });
  }

  /**
   * Valida o email e a senha do usuário.
   * Esse método é chamado automaticamente pelo Passport durante a autenticação.
   */
  validate(email: string, password: string) {
    return this.authService.validateUser(email, password);
  }
}
