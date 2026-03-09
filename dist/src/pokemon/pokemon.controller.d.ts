import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
export declare class PokemonController {
    private readonly pokemonService;
    constructor(pokemonService: PokemonService);
    searchExternal(query: string): Promise<{
        name: any;
        type: any;
        hp: any;
        pokedexNumber: any;
        level: number;
        imageUrl: any;
    }>;
    create(createPokemonDto: CreatePokemonDto, user: any): Promise<{
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
    findAllMine(user: any, page?: string): Promise<{
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
    findAllOthers(user: any, page?: string): Promise<{
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
    update(id: number, updatePokemonDto: UpdatePokemonDto, user: any): Promise<{
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
    remove(id: number, user: any): Promise<{
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
