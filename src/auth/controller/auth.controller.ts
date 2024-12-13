import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { getUserByIdDto, LoginBodyDto } from '../dto/all-auth.dto';

@Controller('auth')
@UsePipes(
  new ValidationPipe({
    transform: true,
    forbidNonWhitelisted: true,
    whitelist: true,
  }),
)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/createUser')
  async create(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.create(createAuthDto);
  }
  @Post('/login')
  async login(@Body() loginBody: LoginBodyDto) {
    return await this.authService.login(loginBody);
  }

  @Get('/getAllUsers')
  async findAll() {
    return await this.authService.findAll();
  }

  @Get('/getUserById/:id')
  async findOne(@Param() id: getUserByIdDto) {
    return await this.authService.findOne(id);
  }

  @Patch('/updateUserById/:id')
  async update(
    @Param() id: getUserByIdDto,
    @Body() updateAuthDto: UpdateAuthDto,
  ) {
    return await this.authService.update(id, updateAuthDto);
  }

  @Delete('/deleteUserById/:id')
  async remove(@Param() id: getUserByIdDto) {
    return await this.authService.remove(id);
  }
}
