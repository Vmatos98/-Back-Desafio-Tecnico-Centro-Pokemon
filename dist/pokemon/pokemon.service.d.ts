import { PrismaService } from '../prisma/prisma.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
export declare class PokemonService {
    private prisma;
    constructor(prisma: PrismaService);
    searchPokeApi(query: string): Promise<{
        name: any;
        type: any;
        hp: any;
        pokedexNumber: any;
        level: number;
        imageUrl: any;
    }>;
    create(createPokemonDto: CreatePokemonDto, userId: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        level: number;
        hp: number;
        pokedexNumber: number;
        imageUrl: string | null;
        userId: number;
    }>;
    findAllMine(userId: number, page?: number): Promise<{
        data: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            type: string;
            level: number;
            hp: number;
            pokedexNumber: number;
            imageUrl: string | null;
            userId: number;
        }[];
        meta: {
            totalItems: number;
            totalPages: number;
            currentPage: number;
        };
    }>;
    findAllOthers(userId: number, page?: number): Promise<{
        data: ({
            user: {
                id: number;
                email: string;
            };
        } & {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            type: string;
            level: number;
            hp: number;
            pokedexNumber: number;
            imageUrl: string | null;
            userId: number;
        })[];
        meta: {
            totalItems: number;
            totalPages: number;
            currentPage: number;
        };
    }>;
    findOne(id: number): Promise<{
        user: {
            id: number;
            email: string;
        };
    } & {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        level: number;
        hp: number;
        pokedexNumber: number;
        imageUrl: string | null;
        userId: number;
    }>;
    update(id: number, updatePokemonDto: UpdatePokemonDto, userId: number): Promise<{
        user: {
            id: number;
            email: string;
        };
    } & {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        level: number;
        hp: number;
        pokedexNumber: number;
        imageUrl: string | null;
        userId: number;
    }>;
    remove(id: number, userId: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        level: number;
        hp: number;
        pokedexNumber: number;
        imageUrl: string | null;
        userId: number;
    }>;
}
