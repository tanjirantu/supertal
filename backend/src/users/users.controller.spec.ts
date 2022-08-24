import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { IUser } from './interfaces/user.interface';
import { UsersService } from './users.service';

const mockUsersRepository = () => ({
  getAll: jest.fn(),
  getById: jest.fn(),
});

const mockUser: IUser = {
  id: 'b17da2f3-0bf7-4988-abef-afe1b3df4b4a',
  firstName: 'Tanjir',
  lastName: 'Antu',
  username: 'tanjirantu',
};

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [{ provide: UsersService, useFactory: mockUsersRepository }],
    }).compile();

    usersService = module.get(UsersService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('getAll', () => {
    it('calls UsersService.getAll and returns the result', async () => {
      const expectedResult = {
        users: [mockUser],
        count: 1,
      };

      jest
        .spyOn(usersService, 'getAll')
        .mockImplementation(async () => expectedResult);
      const finalResult = await usersService.getAll({});
      expect(finalResult).toEqual(expectedResult);
    });
  });

  describe('getById', () => {
    it('calls UsersService.getById and returns the result', async () => {
      const expectedResult = {
        id: 'b17da2f3-0bf7-4988-abef-afe1b3df4b4a',
        firstName: 'Tanjir',
        lastName: 'Antu',
        username: 'tanjirantu',
      };

      const querySpy = jest
        .spyOn(usersService, 'getById')
        .mockImplementation(async () => mockUser);

      const result = await usersService.getById(expectedResult.id);
      expect(querySpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });
  });
});
