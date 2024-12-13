import {
  HttpException,
  HttpStatus,
  Injectable,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from '../entities/auth.entity';
import mongoose, { get, Model } from 'mongoose';
import { getUserByIdDto, LoginBodyDto } from '../dto/all-auth.dto';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cycle = 10;
const secretKey = 'hujfa9afs2ghe3ffh3juh23hu33h2u3';

@Injectable()
export class AuthService {
  constructor(@InjectModel('Auth') private AuthModel: Model<Auth>) {}

  async create(createAuthDto: CreateAuthDto) {
    try {
      console.log('service');
      const ifExist = await this.AuthModel.findOne(
        {
          email: createAuthDto.email,
        },
        { email: 1 },
      );
      if (ifExist)
        throw new HttpException('Email Already Exist!', HttpStatus.CONFLICT);
      createAuthDto.password = await bcrypt.hash(createAuthDto.password, cycle);
      return await this.AuthModel.create(createAuthDto);
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(JSON.stringify(e), HttpStatus.BAD_REQUEST);
    }
  }

  async login(userData: LoginBodyDto) {
    try {
      const getByEmail = await this.AuthModel.findOne({
        email: userData.email,
      });
      if (!getByEmail) {
        throw new HttpException('Invalid user Creds!', HttpStatus.BAD_REQUEST);
      }
      const result = await bcrypt.compare(
        userData.password,
        getByEmail.password,
      );
      if (!result)
        throw new HttpException('Invalid user Creds!', HttpStatus.BAD_REQUEST);

      const token = await jwt.sign({ email: userData.email }, secretKey, {
        expiresIn: '1d',
      });
      return {
        message: 'Logged in successfully!',
        token,
      };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(JSON.stringify(e), HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.AuthModel.find({}, {})
        .limit(10)
        .sort({ created_at: -1 });
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(JSON.stringify(e), HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: getUserByIdDto) {
    try {
      const toMongoId = new mongoose.Types.ObjectId(id.id);
      return await this.AuthModel.findOne({
        _id: toMongoId,
      });
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(JSON.stringify(e), HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: getUserByIdDto, updateAuthDto: UpdateAuthDto) {
    try {
      if (updateAuthDto.password) {
        updateAuthDto.password = await bcrypt.hash(
          updateAuthDto.password,
          cycle,
        );
      }
      return await this.AuthModel.updateOne({ _id: id.id }, updateAuthDto);
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(JSON.stringify(e), HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: getUserByIdDto) {
    try {
      const data = await this.AuthModel.deleteOne({ _id: id.id });
      if (!data.deletedCount)
        throw new HttpException('No user Found!', HttpStatus.BAD_REQUEST);
      return { message: 'User Deleted Successfully!' };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(JSON.stringify(e), HttpStatus.BAD_REQUEST);
    }
  }
}
