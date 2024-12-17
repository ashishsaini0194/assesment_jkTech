import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { model, Model } from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';

export const mockAuthModel = {
  findOne: jest.fn(), // findOne
  create: jest.fn(), // create
  find: jest.fn(), //dind
  updateOne: jest.fn(), // updateOne
  deleteOne: jest.fn(), //deleteon
  login: jest.fn(),
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

  it('should log in successfully', async () => {
    const userData = { id: '232323' };
    const user = { email: 'test@test.com', password: 'valid_password' };

    jest.spyOn(Model, 'findOne').mockResolvedValue(user);
    try {
      const result = await service.findOne({ ...userData });
      console.log(result);
      expect(result).toMatchObject(user);
    } catch (error) {}
  });

  it('should throw an exception for invalid credentials', async () => {
    const userData = { email: 'test@test.com', password: 'invalid_password' };
    mockAuthModel.findOne.mockResolvedValue(null); // Simulate user not found
    await expect(service.login(userData)).rejects.toThrow(
      new HttpException('Invalid user Creds!', HttpStatus.BAD_REQUEST),
    );

    expect(mockAuthModel.findOne).toHaveBeenCalledWith({
      email: userData.email,
    });
  });
});
