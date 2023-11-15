import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './schemas/course.schema';

interface ModelExt<T> extends Model<T> {
  delete: Function
}

@Injectable()
export class CoursesService {
  
  constructor(@InjectModel(Course.name) private courseModel: ModelExt<Course>) {}
  
  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const createdCourse = new this.courseModel(createCourseDto);
    return await createdCourse.save().then(res => {return res}).catch(error => {return error.message});
  }

  findAll() {
    const allCourses = this.courseModel.find();
    return allCourses;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: string) {
    const _id = new Types.ObjectId(id);
    const response = this.courseModel.delete({_id});
    return response;
  }
}
