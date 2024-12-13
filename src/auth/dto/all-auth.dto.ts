import { IsEmail, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class getUserByIdDto {
  @IsMongoId({ message: 'id should be mongo Object id!' })
  id: string;
}

export class LoginBodyDto {
  @IsEmail()
  email: string;

  @IsString({ always: true })
  @IsNotEmpty({ message: 'password can not be empty!' })
  password: string;
}
