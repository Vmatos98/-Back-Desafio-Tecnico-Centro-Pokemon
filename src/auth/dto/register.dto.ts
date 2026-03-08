import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'O endereço de e-mail para registro do usuário',
    example: 'novo_treinador@pokemon.com',
  })
  email!: string;

  @ApiProperty({
    description: 'A senha desejada para a conta',
    example: 'senha_segura_88',
  })
  password!: string;
}
