import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('courses')
@ApiBearerAuth()
@Controller('courses') //http://localhost:3000/courses
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    console.log('Body: ', createCourseDto);
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll(@Query() query: string) {
    console.log('Queryparams: ', query);
    console.log('imprimiendo ENV: ', process.env.ENV_TEST);
    return this.coursesService.findAll();
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number) {
    console.log('Params: ', id)
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.coursesService.remove(+id);
    return this.coursesService.remove(id);
  }
}
