import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UsePipes, 
  ValidationPipe,
  UseInterceptors, 
  UploadedFile, 
  UseGuards,
  SetMetadata
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoggerInterceptor } from 'src/utilities/logger/logger.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/utilities/media.handler';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';

@ApiTags('videos')
@UseInterceptors(LoggerInterceptor)
@UseGuards(AuthGuard, RolesGuard)
@Controller('videos')
// @UsePipes(new ValidationPipe())
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @ApiBearerAuth()
  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    console.log('Post: ', createVideoDto);
    return this.videosService.create(createVideoDto);
  }

  @Post('upload') //http://localhost:3000/v1/videos/upload
  @UseInterceptors(FileInterceptor('my-avatar', {storage}))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // console.log('My File: ', file);
    return 'File uploaded!'
  }

  @Get()
  @SetMetadata('rol',['admin'])
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id')
  @SetMetadata('rol',['manager'])
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(+id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }
}
