import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'O email informado é inválido' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  email: string;

  @IsString({ message: 'O campo password deve ser uma string' })
  @IsNotEmpty({ message: 'O campo password é obrigatório' })
  @MinLength(8, {
    message: 'O campo password deve conter no mínimo 8 caracteres',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha informada não é segura',
  })
  password: string;

  @IsString({ message: 'O campo name deve ser uma string' })
  @IsNotEmpty({ message: 'O campo name é obrigatório' })
  name: string;

  @IsBoolean({ message: 'O campo admin deve ser um boolean' })
  @IsNotEmpty({ message: 'O campo admin é obrigatório' })
  admin: boolean;
}
