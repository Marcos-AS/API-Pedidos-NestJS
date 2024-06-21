/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { OperadorService } from '../../operadores/services/operador.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from '../models/token.model';
import { Operadores } from '../../operadores/entities/operadores.entity';

@Injectable()
export class AuthService {
  constructor(
    private operadorService: OperadorService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<Operadores>> {
    const operadores = await this.operadorService.findByEmail(email);
    if (operadores) {
      const isMatch = await bcrypt.compare(password, operadores.password);
      if (isMatch) {
        const { password, ...rta } = operadores.toJSON();
        return rta;
      }
    }
    return null;
  }

  generateJWT(operador: Operadores) {
    const payload: PayloadToken = { role: operador.role, sub: operador.id };
    return {
      access_token: this.jwtService.sign(payload),
      operador,
    };
  }
}
