import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { VideosModule } from './videos/videos.module';
import { AwardsModule } from './awards/awards.module';
import { UsersModule } from './users/users.module';
import { EventMailModule } from './event-mail/event-mail.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      envFilePath: 'config/.env'
    }),
    JwtModule.register(
      {
        global: true,
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: '3000s' },
      }
    ),
    MongooseModule.forRoot(process.env.MONGO_DEV),
    CoursesModule, 
    AuthModule, 
    VideosModule, 
    AwardsModule, 
    UsersModule, EventMailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
