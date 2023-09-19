import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionsModule } from 'src/common/exceptions/exceptions.module';
import { UserController } from './user.controller';
import { UserMongoService } from './user.mongo.service';
import { UserMysqlService } from './user.mysql.service';
import { getDatabaseSystemIds } from 'src/infrastructure/config/orm.config';

@Module({
  imports: [ExceptionsModule],
  controllers: [UserController],
  providers: [UserMysqlService, UserMongoService],
})
export class UserModule {}
