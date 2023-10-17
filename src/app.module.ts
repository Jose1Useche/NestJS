import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { VideosModule } from './videos/videos.module';
import { AwardsModule } from './awards/awards.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'config/.env'
    }),
    CoursesModule, 
    AuthModule, 
    VideosModule, 
    AwardsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
