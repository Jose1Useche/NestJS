import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
  @Prop({ type: String, unique: true, required: true, trim: true, lowercase: true })
  title: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  cover: string;

  @Prop()
  idAuthor: mongoose.Types.ObjectId
}

export const CourseSchema = SchemaFactory.createForClass(Course);