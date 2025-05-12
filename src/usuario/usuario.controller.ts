import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  // Autetica o login
  @Post('login')
  @UseGuards(AuthGuard) // Protegemos a rota de listagem de usuários
  async login(@Body() body: { login: string; senha: string }) {
    const { login, senha } = body;
    return this.usuarioService.autenticar(login, senha);
  }

  @Post()
  @UseGuards(AuthGuard) // Protegemos a rota de listagem de usuários
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  @UseGuards(AuthGuard) // Protegemos a rota de listagem de usuários
  findAll() {
    return this.usuarioService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usuarioService.findOne(+id);
  // }

  @Get(':login')
  @UseGuards(AuthGuard) // Protegemos a rota de listagem de usuários
  async findOne(@Param('login') login: string) {
    return await this.usuarioService.findOneByLogin(login);
  }

  @Patch(':login')
  @UseGuards(AuthGuard) // Protegemos a rota de listagem de usuários
  async atualizarAluno(
    @Param('login') login: string,
    @Body() updateAlunoDto: UpdateUsuarioDto,
  ) {
    return this.usuarioService.updateByEmail(login, updateAlunoDto);
  }

  @Delete(':string')
  @UseGuards(AuthGuard) // Protegemos a rota de listagem de usuários
  remove(@Param('string') login: string) {
    return this.usuarioService.remove(login);
  }
}
