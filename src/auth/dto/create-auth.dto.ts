import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString({ always: true })
  @IsNotEmpty({ message: 'name can not be empty!' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'name can not be empty!' })
  email: string;

  @IsString({ always: true })
  @IsNotEmpty({ message: 'name can not be empty!' })
  password: string;
}
