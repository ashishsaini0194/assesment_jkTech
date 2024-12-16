import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Model } from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';

export const mockAuthModel = {
  findOne: jest.fn(), // findOne
  create: jest.fn(), // create
  find: jest.fn(), // dind
  updateOne: jest.fn(), // updateOne
  deleteOne: jest.fn(), // deleteOn
};

export const mockBcrypt = {
  hash: jest.fn((password: string, saltRounds: number) =>
    Promise.resolve(`hashed_${password}`),
  ), // to hash
  compare: jest.fn((plainPassword: string, hashedPassword: string) =>
    Promise.resolve(plainPassword === 'valid_password'),
  ), // to compare
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService(mockAuthModel as unknown as Model<any>);
    jest.clearAllMocks();
  });

  it('Should return the user created', async () => {
    const dataToPass = {
      name: 'ashish',
      email: 'fa3@gmail.com',
      password: 'hello',
    };
    const matchRes = {
      ...dataToPass,
      _id: '12345',
      password: '$2b$10$RLlyact09.vMcl/N8Yy2D.McBbYvk1ER2wo8PsBJjC2/lAgvBbvjK',
    };

    mockAuthModel.create.mockReturnValue(matchRes);

    const data = await service.create(dataToPass);

    expect(data).toMatchObject(matchRes);
  });

  it('Throw error if user alredy exist', async () => {
    const dataToPass = {
      name: 'ashish',
      email: 'fa3@gmail.com',
      password: 'hello',
    };

    mockAuthModel.create.mockReturnValue(
      new HttpException('Email Already Exist!', HttpStatus.CONFLICT),
    );

    const data = await service.create(dataToPass);

    expect(data).toMatchObject(
      new HttpException('Email Already Exist!', HttpStatus.CONFLICT),
    );
  });
});
