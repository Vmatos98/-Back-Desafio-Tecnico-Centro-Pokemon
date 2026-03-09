import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

const mockPokemonService = {
  findAllMine: jest.fn(),
  findAllOthers: jest.fn(),
  searchPokeApi: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('PokemonController', () => {
  let controller: PokemonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        { provide: PokemonService, useValue: mockPokemonService },
      ],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call findAllMine with default page', async () => {
    const user = { id: 1 };
    mockPokemonService.findAllMine.mockResolvedValue({ data: [], meta: {} });
    await controller.findAllMine(user, undefined);
    expect(mockPokemonService.findAllMine).toHaveBeenCalledWith(1, 1);
  });

  it('should call create', async () => {
    const dto = { name: 'Pikachu', type: 'Electric', level: 1, hp: 35, pokedexNumber: 25 };
    const user = { id: 1 };
    mockPokemonService.create.mockResolvedValue({ id: 1, ...dto });
    const result = await controller.create(dto, user);
    expect(result).toEqual({ id: 1, ...dto });
    expect(mockPokemonService.create).toHaveBeenCalledWith(dto, 1);
  });

  it('should call findOne', async () => {
    mockPokemonService.findOne.mockResolvedValue({ id: 1, name: 'Pikachu' });
    const result = await controller.findOne(1);
    expect(result).toEqual({ id: 1, name: 'Pikachu' });
    expect(mockPokemonService.findOne).toHaveBeenCalledWith(1);
  });

  it('should call update', async () => {
    const user = { id: 1 };
    mockPokemonService.update.mockResolvedValue({ id: 1, name: 'Raichu' });
    const result = await controller.update(1, { name: 'Raichu' }, user);
    expect(result).toEqual({ id: 1, name: 'Raichu' });
    expect(mockPokemonService.update).toHaveBeenCalledWith(1, { name: 'Raichu' }, 1);
  });

  it('should call remove', async () => {
    const user = { id: 1 };
    mockPokemonService.remove.mockResolvedValue({ id: 1 });
    const result = await controller.remove(1, user);
    expect(result).toEqual({ id: 1 });
    expect(mockPokemonService.remove).toHaveBeenCalledWith(1, 1);
  });
});
