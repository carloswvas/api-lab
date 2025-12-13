import { Test, TestingModule } from '@nestjs/testing';
import { PokemonsController } from '../../../pokemons/pokemons.controller';
import { PokemonsService } from '../../../pokemons/pokemons.service';

describe('PokemonsController', () => {
  let controller: PokemonsController;
  let service: PokemonsService

  const mockPokemonService = {
    findAll: jest.fn(),
    findOne: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonsController],
      providers: [{
        provide: PokemonsService,
        useValue: mockPokemonService
      }]
    }).compile();

    controller = module.get<PokemonsController>(PokemonsController);
    service = module.get<PokemonsService>(PokemonsController)

    jest.clearAllMocks()
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return list with pokemons', async () => {
      const query = { page: 1, limit: 10 };
      const result = { page: 1, limit: 10, total: 1, totalPages: 1, pokemons: [] }

      mockPokemonService.findAll.mockResolvedValue(result)

      expect(await controller.findAll(query)).toEqual(result)
      expect(mockPokemonService.findAll).toHaveBeenCalledWith(query)
    })
  })

  describe('findOne', () => {
    it('should return one pokemon', async () => {
      const result = { id: 1, name: 'bulbasaur' }
      mockPokemonService.findOne.mockResolvedValue(result)

      expect(await service.findOne('1')).toEqual(result)
      expect(mockPokemonService.findOne).toHaveBeenCalledWith('1')

    })
  })
});
