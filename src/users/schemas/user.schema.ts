import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true }) //El timestamps agrega createdAt and updatedAt al documento
export class User {
  @Prop({ unique: true, required: true, trim: true, lowercase: true })
  @IsEmail()
  email: string;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  avatar: string;
  
  @Prop()
  description: string;

  @Prop({
    default: ['user']
  })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);