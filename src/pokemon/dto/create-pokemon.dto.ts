import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, IsNotEmpty } from 'class-validator';

export class CreatePokemonDto {
  @ApiProperty({
    description: 'O nome do Pokémon',
    example: 'Pikachu',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'O tipo do Pokémon (ex: Elétrico, Fogo, Água)',
    example: 'Elétrico',
  })
  @IsString()
  @IsNotEmpty()
  type!: string;

  @ApiProperty({
    description: 'O nível atual do Pokémon, deve ser no mínimo 1',
    example: 10,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  level!: number;

  @ApiProperty({
    description:
      'Os pontos de vida (HP) máximos do Pokémon, deve ser no mínimo 1',
    example: 35,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  hp!: number;

  @ApiProperty({
    description:
      'URL da imagem do Pokémon (Geralmente obtida via PokeAPI automagicamente na busca)',
    example:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    required: false,
  })
  @IsString()
  imageUrl?: string;
}
