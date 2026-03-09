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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pokemon_service_1 = require("./pokemon.service");
const create_pokemon_dto_1 = require("./dto/create-pokemon.dto");
const update_pokemon_dto_1 = require("./dto/update-pokemon.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let PokemonController = class PokemonController {
    pokemonService;
    constructor(pokemonService) {
        this.pokemonService = pokemonService;
    }
    searchExternal(query) {
        return this.pokemonService.searchPokeApi(query);
    }
    create(createPokemonDto, user) {
        return this.pokemonService.create(createPokemonDto, user.id);
    }
    findAllMine(user) {
        return this.pokemonService.findAllMine(user.id);
    }
    findAllOthers(user) {
        return this.pokemonService.findAllOthers(user.id);
    }
    findOne(id) {
        return this.pokemonService.findOne(id);
    }
    update(id, updatePokemonDto, user) {
        return this.pokemonService.update(id, updatePokemonDto, user.id);
    }
    remove(id, user) {
        return this.pokemonService.remove(id, user.id);
    }
};
exports.PokemonController = PokemonController;
__decorate([
    (0, common_1.Get)('search/:query'),
    (0, swagger_1.ApiOperation)({ summary: 'Pesquisar dados de um Pokémon na PokeAPI oficial' }),
    (0, swagger_1.ApiParam)({ name: 'query', description: 'Nome ou ID oficial da Pokedex', example: 'pikachu' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dados JSON do Pokémon retornados diretamente da PokeAPI.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pokémon não encontrado na PokeAPI.' }),
    __param(0, (0, common_1.Param)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PokemonController.prototype, "searchExternal", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Capturar (cadastrar) um novo Pokémon associando ao usuário atual' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Pokémon salvo na sua lista com sucesso.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pokemon_dto_1.CreatePokemonDto, Object]),
    __metadata("design:returntype", void 0)
], PokemonController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('mine'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os Pokémons que pertencem exclusivamente ao usuário logado' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sua lista retornou com sucesso.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PokemonController.prototype, "findAllMine", null);
__decorate([
    (0, common_1.Get)('others'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Explorar Pokémons capturados por outros treinadores da plataforma' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de outros jogadores retornada ocultando parcialmente os e-mails para proteção.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PokemonController.prototype, "findAllOthers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar detalhes de um Pokémon específico salvo no sistema pelo ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pokémon retornado com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pokémon não encontrado no sistema.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PokemonController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar informações do SEU Pokémon (Requer Autoria)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pokémon atualizado com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Acesso negado (Não é o proprietário).' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_pokemon_dto_1.UpdatePokemonDto, Object]),
    __metadata("design:returntype", void 0)
], PokemonController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Deletar/Transferir o SEU Pokémon (Requer Autoria)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pokémon removido com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Acesso negado (Não é o proprietário).' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PokemonController.prototype, "remove", null);
exports.PokemonController = PokemonController = __decorate([
    (0, swagger_1.ApiTags)('Pokemon'),
    (0, common_1.Controller)('pokemon'),
    __metadata("design:paramtypes", [pokemon_service_1.PokemonService])
], PokemonController);
//# sourceMappingURL=pokemon.controller.js.map