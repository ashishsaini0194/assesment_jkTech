import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString({ always: true })
  @IsNotEmpty({ message: 'name can not be empty!' })
  name: string;

  @IsEmail()
  email: string;

  @IsString({ always: true })
  @IsNotEmpty({ message: 'password can not be empty!' })
  password: string;
}
