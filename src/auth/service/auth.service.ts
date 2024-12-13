import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from '../entities/auth.entity';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel('Auth') private AuthModel: Model<Auth>) {}

  async create(createAuthDto: CreateAuthDto) {
    return await this.AuthModel.create(createAuthDto);
  }

  async findAll() {
    console.log('hehe');
    try {
      return await this.AuthModel.find({}, {})
        .limit(10)
        .sort({ created_at: -1 });
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: number) {
    return await this.AuthModel.findById(id);
  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    // return await this.AuthModel.updateOne({})
  }

  async remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
