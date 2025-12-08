import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [TasksModule, MongooseModule.forRoot(
    process.env.MONGO_URI || 'mongodb://root:root@localhost:27017/tasks?authSource=admin'
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
