import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaService) { }

  async searchPokeApi(query: string) {
    const pokemonQuery = query.toLowerCase().trim();
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonQuery}`);
      if (!response.ok) {
        throw new NotFoundException(`Pokémon '${query}' não foi encontrado na PokeAPI oficial.`);
      }

      const data = await response.json();

      const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);

      const hpStat = data.stats.find((statData: any) => statData.stat.name === 'hp');
      const hp = hpStat ? hpStat.base_stat : 0;

      const typeTranslations: Record<string, string> = {
        electric: 'Elétrico', fire: 'Fogo', water: 'Água', grass: 'Planta',
        bug: 'Inseto', poison: 'Venenoso', normal: 'Normal', ground: 'Terra',
        flying: 'Voador', psychic: 'Psíquico', rock: 'Pedra', ice: 'Gelo',
        ghost: 'Fantasma', dragon: 'Dragão', steel: 'Aço', fairy: 'Fada'
      };

      const type = data.types
        .map((typeData: any) => typeTranslations[typeData.type.name] || typeData.type.name)
        .join(', ');

      // 🖼️ Extraindo a imagem de alta resolução (com fallback para o sprite normal)
      const imageUrl = data.sprites?.other?.['official-artwork']?.front_default
        || data.sprites?.front_default
        || null;

      return {
        name,
        type,
        hp,
        pokedexNumber: data.id,
        level: 1,
        imageUrl // Agora a imagem vai para o frontend!
      };

    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Erro ao consultar a PokeAPI externa.');
    }
  }

  async create(createPokemonDto: CreatePokemonDto, userId: number) {
    const { name, type, level, hp, imageUrl } = createPokemonDto;

    // Busca o pokedexNumber oficial usando o nome fornecido como base default a API oficial
    const pokeApiData = await this.searchPokeApi(name);
    const pokedexNumber = pokeApiData.pokedexNumber;

    return this.prisma.pokemon.create({
      data: {
        name,
        type,
        level,
        hp,
        pokedexNumber,
        imageUrl: imageUrl || pokeApiData.imageUrl, // Salva o enviado, ou faz fallback da API
        userId,
      },
    });
  }

  async findAllMine(userId: number) {
    return this.prisma.pokemon.findMany({
      where: { userId },
      orderBy: { id: 'asc' },
    });
  }

  async findAllOthers(userId: number) {
    const pokemons = await this.prisma.pokemon.findMany({
      where: { userId: { not: userId } },
      orderBy: { id: 'asc' },
      include: {
        user: { select: { id: true, email: true } },
      },
    });

    // Mascara o e-mail dos outros treinadores (Ex: test@gmail.com -> te**@gmail.com)
    return pokemons.map((pokemon) => {
      if (pokemon.user && pokemon.user.email) {
        const [username, domain] = pokemon.user.email.split('@');
        const censoredUsername = username.length > 2 
          ? `${username.substring(0, 2)}***` 
          : `${username.charAt(0)}***`;
        
        pokemon.user.email = `${censoredUsername}@${domain}`;
      }
      return pokemon;
    });
  }

  async findOne(id: number) {
    const pokemon = await this.prisma.pokemon.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, email: true } },
      },
    });
    if (!pokemon) {
      throw new NotFoundException(`Pokémon com ID ${id} não encontrado no sistema.`);
    }
    return pokemon;
  }

  async update(id: number, updatePokemonDto: UpdatePokemonDto, userId: number) {
    const pokemon = await this.findOne(id);

    // Validação de Propriedade
    if (pokemon.userId !== userId) {
      throw new ForbiddenException('Acesso negado: Você só pode atualizar os atributos dos Pokémons que você capturou.');
    }

    return this.prisma.pokemon.update({
      where: { id },
      data: updatePokemonDto,
      include: { user: { select: { id: true, email: true } } },
    });
  }

  async remove(id: number, userId: number) {
    const pokemon = await this.findOne(id);

    // Validação de Propriedade
    if (pokemon.userId !== userId) {
      throw new ForbiddenException('Acesso negado: Você não pode transferir/deletar um Pokémon que pertence a outro treinador.');
    }

    return this.prisma.pokemon.delete({ where: { id } });
  }
}
