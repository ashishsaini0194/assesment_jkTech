import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AppService } from './service/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${__dirname}/../../.env`,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@assessment.vimfr.mongodb.net/?retryWrites=true&w=majority&appName=assessment`,
    ),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    // console.log(process.env);
  }
}
