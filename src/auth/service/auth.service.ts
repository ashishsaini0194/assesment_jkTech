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
import mongoose, { Model } from 'mongoose';
import { getUserByIdDto } from '../dto/all-auth.dto';
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
      return await this.AuthModel.create(createAuthDto);
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
