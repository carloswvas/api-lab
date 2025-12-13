import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindPokemonDTO } from './dtos/find-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon, PokemonDocument } from './shemas/pokemon.schema';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<PokemonDocument>,
  ) {}

  async findAll(queryDTO: FindPokemonDTO) {
    const {
      search,
      generation,
      type,
      orderBy,
      order,
      page = 1,
      limit = 10,
    } = queryDTO;

    const filter: any = {};

    if (search) {
      filter.$or = [
        { name: { $regex: `^${search}`, $options: 'i' } },
        { id: Number(search) || -1 },
      ];
    }

    if (generation) {
      filter['generation.id'] = generation;
    }

    if (type) {
      filter['types.name'] = { $regex: type, $options: 'i' };
    }

    const sort: any = {};
    if (orderBy) {
      sort[orderBy] = order === 'ASC' ? 1 : -1;
    }

    const skip = (page - 1) * limit;

    const pokemons = await this.pokemonModel
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.pokemonModel.countDocuments(filter);

    return {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      pokemons,
    };
  }

  async findOne(id: string): Promise<Pokemon> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`O ID: ${id} não é válido.`);
    }

    const pokemon = await this.pokemonModel.findById(id).exec();
    if (!pokemon) {
      throw new NotFoundException(`Pokemon with ID: ${id} not found`);
    }

    return pokemon;
  }
}
