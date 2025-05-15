import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async autenticar(
    login: string,
    senha: string,
  ): Promise<Omit<Usuario, '_id' | 'senha'>> {
    const usuario = await this.usuarioRepository.findOneBy({ login });

    if (!usuario) {
      throw new NotFoundException('Usuario não encontrado');
    }

    // console.log(usuario)

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Remove _id e senha antes de retornar
    const { _id, senha: _, ...usuarioSemSenha } = usuario;

    // console.log(usuarioSemSenha)

    return usuarioSemSenha;
  }

  // Cria o usuario com hash na senha
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // Verifica se já existe um usuario com o mesmo email
    const usuarioExistente = await this.usuarioRepository.findOne({
      where: { login: createUsuarioDto.login },
    });

    if (usuarioExistente) {
      throw new HttpException('Email já cadastrado.', HttpStatus.CONFLICT); // 409
    }

    // Criptografa a senha
    const hashedSenha = await bcrypt.hash(createUsuarioDto.senha, 10);

    // Cria e salva o novo usuario
    const novousuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      senha: hashedSenha,
    });

    return this.usuarioRepository.save(novousuario);
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  async findOneByLogin(login: string) {
    return this.usuarioRepository.findOne({ where: { login } });
  }

  async updateByEmail(
    email: string,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Omit<Usuario, '_id' | 'senha'>> {
    const usuario = await this.usuarioRepository.findOne({
      where: { login: email },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario não encontrado com esse e-mail');
    }

    // Se estiver atualizando a senha, aplicar o hash
    if (updateUsuarioDto.senha) {
      updateUsuarioDto.senha = await bcrypt.hash(updateUsuarioDto.senha, 10);
    }

    await this.usuarioRepository.update(usuario._id, updateUsuarioDto);

    const usuarioAtualizado = await this.usuarioRepository.findOne({
      where: { _id: usuario._id },
    });

    if (!usuarioAtualizado) {
      throw new NotFoundException(
        'Erro ao atualizar: usuário não encontrado após atualização',
      );
    }

    // Remove _id e senha antes de retornar
    const { _id, senha: _, ...usuarioSemSenha } = usuarioAtualizado;
    return usuarioSemSenha;
  }

  async remove(login: string) {
    const usuario = await this.usuarioRepository.findOneBy({ login });
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return this.usuarioRepository.remove(usuario);
  }
}
