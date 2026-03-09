import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('search/:query')
  @ApiOperation({ summary: 'Pesquisar dados de um Pokémon na PokeAPI oficial' })
  @ApiParam({
    name: 'query',
    description: 'Nome ou ID oficial da Pokedex',
    example: 'pikachu',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados JSON do Pokémon retornados diretamente da PokeAPI.',
  })
  @ApiResponse({
    status: 404,
    description: 'Pokémon não encontrado na PokeAPI.',
  })
  searchExternal(@Param('query') query: string) {
    return this.pokemonService.searchPokeApi(query);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Capturar (cadastrar) um novo Pokémon associando ao usuário atual',
  })
  @ApiResponse({
    status: 201,
    description: 'Pokémon salvo na sua lista com sucesso.',
  })
  create(@Body() createPokemonDto: CreatePokemonDto, @CurrentUser() user: any) {
    return this.pokemonService.create(createPokemonDto, user.id);
  }

  @Get('mine')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary:
      'Listar todos os Pokémons que pertencem exclusivamente ao usuário logado',
  })
  @ApiResponse({ status: 200, description: 'Sua lista retornou com sucesso.' })
  findAllMine(@CurrentUser() user: any) {
    return this.pokemonService.findAllMine(user.id);
  }

  @Get('others')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary:
      'Explorar Pokémons capturados por outros treinadores da plataforma',
  })
  @ApiResponse({
    status: 200,
    description:
      'Lista de outros jogadores retornada ocultando parcialmente os e-mails para proteção.',
  })
  findAllOthers(@CurrentUser() user: any) {
    return this.pokemonService.findAllOthers(user.id);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary:
      'Buscar detalhes de um Pokémon específico salvo no sistema pelo ID',
  })
  @ApiResponse({ status: 200, description: 'Pokémon retornado com sucesso.' })
  @ApiResponse({
    status: 404,
    description: 'Pokémon não encontrado no sistema.',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pokemonService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Atualizar informações do SEU Pokémon (Requer Autoria)',
  })
  @ApiResponse({ status: 200, description: 'Pokémon atualizado com sucesso.' })
  @ApiResponse({
    status: 403,
    description: 'Acesso negado (Não é o proprietário).',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePokemonDto: UpdatePokemonDto,
    @CurrentUser() user: any,
  ) {
    return this.pokemonService.update(id, updatePokemonDto, user.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Deletar/Transferir o SEU Pokémon (Requer Autoria)',
  })
  @ApiResponse({ status: 200, description: 'Pokémon removido com sucesso.' })
  @ApiResponse({
    status: 403,
    description: 'Acesso negado (Não é o proprietário).',
  })
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: any) {
    return this.pokemonService.remove(id, user.id);
  }
}
