import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

const mockAuthService = {
  login: jest.fn(),
  validateUser: jest.fn(),
  register: jest.fn(),
};

const mockUsersService = {};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call authService.login on login', async () => {
    const dto = { email: 'test@example.com', password: 'password123' };
    const user = { id: 1, email: 'test@example.com' };
    
    mockAuthService.validateUser.mockResolvedValue(user);
    mockAuthService.login.mockResolvedValue({ access_token: 'token' });
    
    const result = await controller.login(dto);
    
    expect(result).toEqual({ access_token: 'token' });
    expect(mockAuthService.validateUser).toHaveBeenCalledWith(dto.email, dto.password);
    expect(mockAuthService.login).toHaveBeenCalledWith(user);
  });
  
  it('should call authService.register on register', async () => {
    const dto = { name: 'Test', email: 'test@example.com', password: 'password123' };
    const resultUser = { id: 1, name: 'Test', email: 'test@example.com' };
    mockAuthService.register.mockResolvedValue(resultUser);
    
    const result = await controller.register(dto);
    
    expect(result).toEqual(resultUser);
    expect(mockAuthService.register).toHaveBeenCalledWith(dto);
  });
});
