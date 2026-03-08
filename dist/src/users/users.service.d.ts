import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<{
        id: number;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    create(data: Prisma.UserCreateInput): Promise<{
        id: number;
        email: string;
        createdAt: Date;
    }>;
}
