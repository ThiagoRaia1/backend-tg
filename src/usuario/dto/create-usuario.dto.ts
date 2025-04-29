import { IsString, IsNotEmpty, IsEmail } from 'class-validator'

export class CreateUsuarioDto {
  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty()
  login: string

  @IsString()
  @IsNotEmpty()
  senha: string

  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string
}