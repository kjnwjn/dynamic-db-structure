import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserType } from 'src/common/enums/userType.enum';
import { ExceptionsService } from 'src/common/exceptions/exceptions.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserPresenter } from './presenter/user.presenter';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly exceptionService: ExceptionsService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const data = await this.userService.create(createUserDto);
      return data;
    } catch (error) {
      console.log(error);

      throw this.exceptionService.internalServerErrorException({
        message: 'Internal server error',
      });
    }
  }

  // @UseGuards(AuthenGuard)
  @Get()
  async findAll() {
    try {
      const data = await this.userService.findAll('MYSQL');

      return data;
    } catch (error) {
      console.log(error);
      throw this.exceptionService.internalServerErrorException({
        message: 'Internal server error',
      });
    }
  }

  @Roles(UserType.ADMIN, UserType.EMPLOYEE)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const data = await this.userService.findOne(+id);
      return data;
    } catch (error) {
      throw this.exceptionService.internalServerErrorException({
        message: 'Internal server error',
      });
    }
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return this.userService.update(+id, updateUserDto);
    } catch (error) {
      throw this.exceptionService.internalServerErrorException({
        message: 'Internal server error',
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const data = await this.userService.remove(+id);

      return `delete user ${id} success`;
    } catch (error) {
      throw this.exceptionService.internalServerErrorException({
        message: 'Internal server error',
      });
    }
  }
}
