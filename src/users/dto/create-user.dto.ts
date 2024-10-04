import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail({}, { message: 'O campo email deve conter um email válido' })
  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo password é obrigatório' })
  @MinLength(8, {
    message: 'O campo password deve conter no mínimo 8 caracteres',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo name é obrigatório' })
  name: string;

  @IsBoolean({ message: 'O campo admin deve ser um boolean' })
  @IsNotEmpty({ message: 'O campo admin é obrigatório' })
  admin: boolean;
}
