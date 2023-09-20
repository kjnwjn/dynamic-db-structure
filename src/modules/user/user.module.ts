import { Module } from '@nestjs/common';
import { ExceptionsModule } from 'src/common/exceptions/exceptions.module';
import { UserController } from './user.controller';
import { UserMongoService } from './user.mongo.service';
import { UserMysqlService } from './user.mysql.service';

@Module({
  imports: [ExceptionsModule],
  controllers: [UserController],
  providers: [UserMysqlService, UserMongoService],
})
export class UserModule {}
