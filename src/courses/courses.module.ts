import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Course.name, schema: CourseSchema }
      ]
    )
    
    // MongooseModule.forFeatureAsync(
    //   [
    //     {
    //       name: Course.name,
    //       useFactory: () => {
    //         const schema = CourseSchema;
    //         const pluginOption = { overrideMethods: 'all' };
    //         schema.plugin(require('mongoose-delete'), pluginOption);
    //         return schema;
    //       },
    //     },
    //   ]
    // ),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
