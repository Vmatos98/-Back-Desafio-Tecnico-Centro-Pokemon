import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';

const mockPrismaService = {
  pokemon: {
    findMany: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllMine', () => {
    it('should return paginated pokemons', async () => {
      const mockPokemons = [{ id: 1, name: 'Pikachu', userId: 1 }];
      mockPrismaService.pokemon.findMany.mockResolvedValue(mockPokemons);
      mockPrismaService.pokemon.count.mockResolvedValue(1);

      const result = await service.findAllMine(1, 1);

      expect(result.data).toEqual(mockPokemons);
      expect(result.meta.totalItems).toBe(1);
    });
  });

  describe('create', () => {
    it('should create a pokemon', async () => {
      const createDto = { name: 'Pikachu', type: 'Electric', level: 1, hp: 35, pokedexNumber: 25 };
      mockPrismaService.pokemon.create.mockResolvedValue({ id: 1, ...createDto, userId: 1 });
      
      jest.spyOn(service, 'searchPokeApi').mockResolvedValue({ pokedexNumber: 25, name: 'Pikachu', hp: 35, type: 'Electric', level: 1, imageUrl: 'url' });

      const result = await service.create(createDto, 1);
      
      expect(result).toBeDefined();
      expect(mockPrismaService.pokemon.create).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if not found', async () => {
      mockPrismaService.pokemon.findUnique.mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });

    it('should return pokemon if found', async () => {
      const mockPokemon = { id: 1, name: 'Pikachu' };
      mockPrismaService.pokemon.findUnique.mockResolvedValue(mockPokemon);
      const result = await service.findOne(1);
      expect(result).toEqual(mockPokemon);
    });
  });

  describe('update', () => {
    it('should throw ForbiddenException if user is not owner', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue({ id: 1, userId: 2 } as any);
      await expect(service.update(1, { name: 'Raichu' }, 1)).rejects.toThrow(ForbiddenException);
    });

    it('should update if user is owner', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue({ id: 1, userId: 1 } as any);
      mockPrismaService.pokemon.update.mockResolvedValue({ id: 1, name: 'Raichu' });
      const result = await service.update(1, { name: 'Raichu' }, 1);
      expect(result).toEqual({ id: 1, name: 'Raichu' });
    });
  });

  describe('remove', () => {
    it('should throw ForbiddenException if user is not owner', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue({ id: 1, userId: 2 } as any);
      await expect(service.remove(1, 1)).rejects.toThrow(ForbiddenException);
    });

    it('should delete if user is owner', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue({ id: 1, userId: 1 } as any);
      mockPrismaService.pokemon.delete.mockResolvedValue({ id: 1 });
      const result = await service.remove(1, 1);
      expect(result).toEqual({ id: 1 });
    });
  });
});
