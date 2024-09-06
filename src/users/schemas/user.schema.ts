import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  profile_picture_url: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
