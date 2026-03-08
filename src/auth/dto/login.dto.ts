import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'O endereço de e-mail do usuário',
    example: 'treinador@pokemon.com',
  })
  email!: string;

  @ApiProperty({
    description: 'A senha do usuário',
    example: 'pikachu_123',
  })
  password!: string;
}
