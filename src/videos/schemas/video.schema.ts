import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsUrl } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';

export type VideoDocument = HydratedDocument<Video>;

@Schema()
export class Video {
  @Prop()
  title: string;
  
  @Prop()
  description: string;

  @Prop()
  @IsUrl()
  source: string;

  @Prop()
  cover: string;

  @Prop()
  idCourse: mongoose.Types.ObjectId
}

export const VideoSchema = SchemaFactory.createForClass(Video);