import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

const mockUsersService = {
  findByEmail: jest.fn(),
  create: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login a user and return a token', async () => {
    const user = { id: 1, email: 'test@example.com' };
    mockJwtService.sign.mockReturnValue('mock-jwt-token');

    const result = await service.login(user);

    expect(result).toEqual({ access_token: 'mock-jwt-token' });
    expect(mockJwtService.sign).toHaveBeenCalledWith({ email: user.email, sub: user.id });
  });
});
