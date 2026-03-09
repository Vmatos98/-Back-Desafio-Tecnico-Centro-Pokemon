import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(body: RegisterDto): Promise<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
    }>;
    login(body: LoginDto): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
