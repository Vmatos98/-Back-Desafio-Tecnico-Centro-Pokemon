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
exports.CreatePokemonDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreatePokemonDto {
    name;
    type;
    level;
    hp;
    imageUrl;
}
exports.CreatePokemonDto = CreatePokemonDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'O nome do Pokémon',
        example: 'Pikachu',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePokemonDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'O tipo do Pokémon (ex: Elétrico, Fogo, Água)',
        example: 'Elétrico',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePokemonDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'O nível atual do Pokémon, deve ser no mínimo 1',
        example: 10,
        minimum: 1,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreatePokemonDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Os pontos de vida (HP) máximos do Pokémon, deve ser no mínimo 1',
        example: 35,
        minimum: 1,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreatePokemonDto.prototype, "hp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL da imagem do Pokémon (Geralmente obtida via PokeAPI automagicamente na busca)',
        example: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePokemonDto.prototype, "imageUrl", void 0);
//# sourceMappingURL=create-pokemon.dto.js.map