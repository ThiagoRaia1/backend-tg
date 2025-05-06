import { IsEmail, IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty({ message: 'Preencha todos os campos.' })
  nome: string;

  @IsNotEmpty({ message: 'Preencha todos os campos.' })
  @ValidateIf((obj) => obj.login !== '') // só valida email se login estiver preenchido
  @IsEmail({}, { message: 'E-mail inválido.' })
  login: string;

  @IsNotEmpty({ message: 'Preencha todos os campos.' })
  senha: string;
}
