import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usuarioService: UsuarioService,
  ) {}

  async validateUser(login: string, senha: string) {
    // Buscamos o usuário pelo e-mail
    const usuario = await this.usuarioService.findOneByLogin(login);
    // Verificamos se o usuário existe e se a senha está correta
    if (usuario && bcrypt.compareSync(senha, usuario.senha)) {
      // Se o usuário existe e a senha está correta retornamos o usuário
      return usuario;
    }
    // Caso contrário retornamos null
    return null;
  }

  async login(usuario: { login: string; nome: string }) {
    // Definimos o payload do JWT com os dados que queremos incluir
    const payload = {
      login: usuario.login,
      nome: usuario.nome,
    };

    // Geramos o token e retornamos o token + dados do usuário
    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        login: usuario.login,
        nome: usuario.nome,
      },
    };
  }
}
