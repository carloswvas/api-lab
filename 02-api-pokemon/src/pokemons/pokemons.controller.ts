import { Controller, Get, Param, Query } from '@nestjs/common';
import { FindPokemonDTO } from './dtos/find-pokemon.dto';
import { PokemonsService } from './pokemons.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Pokemons')
@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) { }

  @ApiOperation({ summary: 'Lista de pokemons com filtros e paginação' })
  @ApiResponse({
    status: 200,
    description: 'Lista de Pokemons',
    schema: {
      example: {
        "page": 1,
        "limit": 10,
        "total": 1025,
        "totalPages": 103,
        "pokemons": [
          {
            "_id": "6938d0efb2beda5a155cf484",
            "id": 1,
            "name": "bulbasaur",
            "height": 7,
            "weight": 69,
            "base_experience": 64,
            "image_path": "public/images/1-bulbasaur.png",
            "types": [
              {
                "_id": "693c570144c3f65276988b40",
                "id": 12,
                "name": "Grass"
              },
              {
                "_id": "693c570144c3f65276988b41",
                "id": 4,
                "name": "Poison"
              }
            ],
            "stats": [
              {
                "_id": "693c570144c3f65276988b42",
                "id": 1,
                "name": "HP",
                "base_stat": 45
              },
              {
                "_id": "693c570144c3f65276988b43",
                "id": 2,
                "name": "Attack",
                "base_stat": 49
              },
              {
                "_id": "693c570144c3f65276988b44",
                "id": 3,
                "name": "Defense",
                "base_stat": 49
              },
              {
                "_id": "693c570144c3f65276988b45",
                "id": 4,
                "name": "Special Attack",
                "base_stat": 65
              },
              {
                "_id": "693c570144c3f65276988b46",
                "id": 5,
                "name": "Special Defense",
                "base_stat": 65
              },
              {
                "_id": "693c570144c3f65276988b47",
                "id": 6,
                "name": "Speed",
                "base_stat": 45
              }
            ],
            "abilities": [
              {
                "_id": "693c570144c3f65276988b48",
                "id": 65,
                "name": "Overgrow",
                "is_hidden": false,
                "slot": 1
              },
              {
                "_id": "693c570144c3f65276988b49",
                "id": 34,
                "name": "Chlorophyll",
                "is_hidden": true,
                "slot": 3
              }
            ],
            "generation": {
              "id": 1,
              "name": "Generation I",
              "_id": "693c570144c3f65276988b4a"
            }
          }
        ]
      }
    }
  })
  @Get()
  findAll(@Query() queryDTO: FindPokemonDTO) {
    return this.pokemonsService.findAll(queryDTO);
  }

  @ApiOperation({
    summary: 'Buscar uma Pokemon pelo ID'
  })
  @ApiParam({
    name: 'id',
    description: '_id do Pokemon a ser buscado',
    example: '6938d0efb2beda5a155cf484'
  })
  @ApiResponse({
    status: 200,
    description: 'Pokemon encontrado',
    example: {
      "_id": "6938d0efb2beda5a155cf484",
      "id": 1,
      "name": "bulbasaur",
      "height": 7,
      "weight": 69,
      "base_experience": 64,
      "image_path": "public/images/1-bulbasaur.png",
      "types": [
        {
          "_id": "693c58594449524e5775c5bd",
          "id": 12,
          "name": "Grass"
        },
        {
          "_id": "693c58594449524e5775c5be",
          "id": 4,
          "name": "Poison"
        }
      ],
      "stats": [
        {
          "_id": "693c58594449524e5775c5bf",
          "id": 1,
          "name": "HP",
          "base_stat": 45
        },
        {
          "_id": "693c58594449524e5775c5c0",
          "id": 2,
          "name": "Attack",
          "base_stat": 49
        },
        {
          "_id": "693c58594449524e5775c5c1",
          "id": 3,
          "name": "Defense",
          "base_stat": 49
        },
        {
          "_id": "693c58594449524e5775c5c2",
          "id": 4,
          "name": "Special Attack",
          "base_stat": 65
        },
        {
          "_id": "693c58594449524e5775c5c3",
          "id": 5,
          "name": "Special Defense",
          "base_stat": 65
        },
        {
          "_id": "693c58594449524e5775c5c4",
          "id": 6,
          "name": "Speed",
          "base_stat": 45
        }
      ],
      "abilities": [
        {
          "_id": "693c58594449524e5775c5c5",
          "id": 65,
          "name": "Overgrow",
          "is_hidden": false,
          "slot": 1
        },
        {
          "_id": "693c58594449524e5775c5c6",
          "id": 34,
          "name": "Chlorophyll",
          "is_hidden": true,
          "slot": 3
        }
      ],
      "generation": {
        "id": 1,
        "name": "Generation I",
        "_id": "693c58594449524e5775c5c7"
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'ID do pokemon é inválido',
    example: {
      "message": "O ID: 6938d0efb2beda5a155cf48 não é válido.",
      "error": "Bad Request",
      "statusCode": 400
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Pokemon não encontrado',
    example: {
      "message": "Pokemon with ID: 6938d0efb2beda5a155ce484 not found",
      "error": "Not Found",
      "statusCode": 404
    }
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemonsService.findOne(id);
  }
}
