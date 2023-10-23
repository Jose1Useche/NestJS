import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true }) //El timestamps agrega createdAt and updatedAt al documento
export class User {
  @Prop({ unique: true, required: true, type: String, trim: true, lowercase: true })
  @IsEmail()
  email: string;

  @Prop()
  password: string;

  @Prop()
  avatar: string;
  
  @Prop()
  description: string;
}

export const UserSchema = SchemaFactory.createForClass(User);