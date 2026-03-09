"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PokemonService = class PokemonService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async searchPokeApi(query) {
        const pokemonQuery = query.toLowerCase().trim();
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonQuery}`);
            if (!response.ok) {
                throw new common_1.NotFoundException(`Pokémon '${query}' não foi encontrado na PokeAPI oficial.`);
            }
            const data = await response.json();
            const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            const hpStat = data.stats.find((statData) => statData.stat.name === 'hp');
            const hp = hpStat ? hpStat.base_stat : 0;
            const typeTranslations = {
                electric: 'Elétrico',
                fire: 'Fogo',
                water: 'Água',
                grass: 'Planta',
                bug: 'Inseto',
                poison: 'Venenoso',
                normal: 'Normal',
                ground: 'Terra',
                flying: 'Voador',
                psychic: 'Psíquico',
                rock: 'Pedra',
                ice: 'Gelo',
                ghost: 'Fantasma',
                dragon: 'Dragão',
                steel: 'Aço',
                fairy: 'Fada',
            };
            const type = data.types
                .map((typeData) => typeTranslations[typeData.type.name] || typeData.type.name)
                .join(', ');
            const imageUrl = data.sprites?.other?.['official-artwork']?.front_default ||
                data.sprites?.front_default ||
                null;
            return {
                name,
                type,
                hp,
                pokedexNumber: data.id,
                level: 1,
                imageUrl,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.BadRequestException('Erro ao consultar a PokeAPI externa.');
        }
    }
    async create(createPokemonDto, userId) {
        const { name, type, level, hp, imageUrl } = createPokemonDto;
        const pokeApiData = await this.searchPokeApi(name);
        const pokedexNumber = pokeApiData.pokedexNumber;
        return this.prisma.pokemon.create({
            data: {
                name,
                type,
                level,
                hp,
                pokedexNumber,
                imageUrl: imageUrl || pokeApiData.imageUrl,
                userId,
            },
        });
    }
    async findAllMine(userId, page = 1) {
        const limit = 8;
        const skip = (page - 1) * limit;
        const [pokemons, totalItems] = await Promise.all([
            this.prisma.pokemon.findMany({
                where: { userId },
                orderBy: { id: 'asc' },
                skip,
                take: limit,
            }),
            this.prisma.pokemon.count({
                where: { userId },
            }),
        ]);
        const totalPages = Math.ceil(totalItems / limit);
        return {
            data: pokemons,
            meta: {
                totalItems,
                totalPages: totalPages === 0 ? 1 : totalPages,
                currentPage: page,
            },
        };
    }
    async findAllOthers(userId, page = 1) {
        const limit = 20;
        const skip = (page - 1) * limit;
        const [pokemonsRaw, totalItems] = await Promise.all([
            this.prisma.pokemon.findMany({
                where: { userId: { not: userId } },
                orderBy: { id: 'asc' },
                include: {
                    user: { select: { id: true, email: true } },
                },
                skip,
                take: limit,
            }),
            this.prisma.pokemon.count({
                where: { userId: { not: userId } },
            }),
        ]);
        const data = pokemonsRaw.map((pokemon) => {
            if (pokemon.user && pokemon.user.email) {
                const [username, domain] = pokemon.user.email.split('@');
                const censoredUsername = username.length > 2
                    ? `${username.substring(0, 2)}***`
                    : `${username.charAt(0)}***`;
                pokemon.user.email = `${censoredUsername}@${domain}`;
            }
            return pokemon;
        });
        const totalPages = Math.ceil(totalItems / limit);
        return {
            data,
            meta: {
                totalItems,
                totalPages: totalPages === 0 ? 1 : totalPages,
                currentPage: page,
            },
        };
    }
    async findOne(id) {
        const pokemon = await this.prisma.pokemon.findUnique({
            where: { id },
            include: {
                user: { select: { id: true, email: true } },
            },
        });
        if (!pokemon) {
            throw new common_1.NotFoundException(`Pokémon com ID ${id} não encontrado no sistema.`);
        }
        return pokemon;
    }
    async update(id, updatePokemonDto, userId) {
        const pokemon = await this.findOne(id);
        if (pokemon.userId !== userId) {
            throw new common_1.ForbiddenException('Acesso negado: Você só pode atualizar os atributos dos Pokémons que você capturou.');
        }
        return this.prisma.pokemon.update({
            where: { id },
            data: updatePokemonDto,
            include: { user: { select: { id: true, email: true } } },
        });
    }
    async remove(id, userId) {
        const pokemon = await this.findOne(id);
        if (pokemon.userId !== userId) {
            throw new common_1.ForbiddenException('Acesso negado: Você não pode transferir/deletar um Pokémon que pertence a outro treinador.');
        }
        return this.prisma.pokemon.delete({ where: { id } });
    }
};
exports.PokemonService = PokemonService;
exports.PokemonService = PokemonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PokemonService);
//# sourceMappingURL=pokemon.service.js.map