import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: Prisma.UserCreateInput): Promise<{
        id: number;
        email: string;
        createdAt: Date;
    }>;
    login(body: Record<string, any>): Promise<{
        access_token: string;
    }>;
}
