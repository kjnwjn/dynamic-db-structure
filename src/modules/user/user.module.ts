import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionsModule } from 'src/common/exceptions/exceptions.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [ExceptionsModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
