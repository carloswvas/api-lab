import { Test, TestingModule } from '@nestjs/testing';
import { PokemonsService } from '../../pokemons.service';
import { getModelToken } from '@nestjs/mongoose';
import { Pokemon } from '../../../pokemons/shemas/pokemon.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('PokemonsService', () => {
  let service: PokemonsService;

  const mockQuery = {
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    exec: jest.fn(),
  };

  const mockPokemonModel = {
    find: jest.fn().mockReturnValue(mockQuery),
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    exec: jest.fn(),

    findById: jest.fn(),
    countDocuments: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonsService,
        {
          provide: getModelToken(Pokemon.name),
          useValue: mockPokemonModel,
        },
      ],
    }).compile();

    service = module.get<PokemonsService>(PokemonsService);

    jest.clearAllMocks()
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('shuold return paginated pokemons', async () => {
      const dto = {
        search: '',
        page: 1,
        limit: 10
      }

      mockQuery.exec.mockResolvedValueOnce([{ name: 'bulbasaur' }])
      mockPokemonModel.countDocuments.mockResolvedValueOnce(1)

      const result = await service.findAll(dto as any)

      expect(mockPokemonModel.find).toHaveBeenCalled()
      expect(mockPokemonModel.countDocuments).toHaveBeenCalled()

      expect(result).toEqual({
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
        pokemons: [{ name: 'bulbasaur' }]
      })

    })
  })

  describe('findOne', () => {
    it('should throw BadRequestException for invalid ID', async () => {
      await expect(service.findOne('123'))
        .rejects
        .toThrow(BadRequestException)
    })

    it('should throw NotFoundException if pokemon not found', async () => {
      mockPokemonModel.findById.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null)
      });

      await expect(service.findOne('64b0f1bb12a8c9fc2bb2b345'))
        .rejects
        .toThrow(NotFoundException)
    })

    it('should return a pokemon', async () => {
      const mockPokemon = { name: 'Bulbasaur' };

      mockPokemonModel.findById.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockPokemon),
      });

      const result = await service.findOne('64b0f1bb12a8c9fc2bb2b345');

      expect(result).toEqual(mockPokemon);
    });
  })


});
