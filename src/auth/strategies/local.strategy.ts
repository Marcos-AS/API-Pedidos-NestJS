import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { Operadores } from 'src/operadores/entities/operadores.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Partial<Operadores>> {
    const user = this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('no está autorizado');
    }
    return user;
  }
}
