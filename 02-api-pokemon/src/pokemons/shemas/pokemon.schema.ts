import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PokemonDocument = HydratedDocument<Pokemon>;

@Schema({ timestamps: true })
export class Pokemon {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop()
  base_experience: number;

  @Prop()
  image_path: string;

  @Prop({
    type: [{ id: Number, name: String }],
    default: [],
  })
  types: Array<{ id: number; name: string }>;

  @Prop({
    type: [{ id: Number, name: String, base_stat: Number }],
    default: [],
  })
  stats: Array<{ id: number; name: string; base_stat: number }>;

  @Prop({
    type: [{ id: Number, name: String, is_hidden: Boolean, slot: Number }],
    default: [],
  })
  abilities: Array<{
    id: number;
    name: string;
    is_hidden: boolean;
    slot: number;
  }>;

  @Prop({
    type: {
      id: Number,
      name: String,
    },
    default: null,
  })
  generation: { id: number; name: string };
}

const PokemonSchema = SchemaFactory.createForClass(Pokemon);

PokemonSchema.index({ name: 'text' });
PokemonSchema.index({
  id: 1,
  'generation.id': 1,
  'types.name': 1,
  createdAt: -1
})

export { PokemonSchema };
