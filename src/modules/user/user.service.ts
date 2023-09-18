import { Injectable, NotFoundException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { loadEntityManager } from 'src/common/helpers/loadEntityManager.helper';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User as UserMysql } from './entities/user.mysql.entity';
import { UserPresenter } from './presenter/user.presenter';
import { User as UserMongo } from './entities/user.mongo.entity';

@Injectable()
export class UserService {
  constructor(private moduleRef: ModuleRef) {}

  async create(createUserDto: CreateUserDto) {
    const entityManager = await loadEntityManager('MYSQL', this.moduleRef);
    const entityManagerMongo = await loadEntityManager('MONGO', this.moduleRef);

    let user = await entityManager.getRepository(UserMysql).save(createUserDto);
    let userMongo = await entityManagerMongo
      .getMongoRepository(UserMongo)
      .save(createUserDto);

    console.log(user);

    if (!user) {
      return false;
    }
    return true;
  }
  async findAll(systemId: string): Promise<UserMysql[]> {
    const entityManager = await loadEntityManager(systemId, this.moduleRef);
    const entityManagerMongo = await loadEntityManager('MONGO', this.moduleRef);
    console.log(await entityManagerMongo.getMongoRepository(UserMongo).find());

    if (!entityManager) {
      return [];
    }

    return entityManager.find(UserMysql);
  }

  async findOne(id: number): Promise<UserMongo> {
    const entityManagerMongo = await loadEntityManager('MONGO', this.moduleRef);
    let user = await entityManagerMongo
      .getMongoRepository(UserMongo)
      .findOneBy({ where: id });

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return null;
  }

  async remove(id: number) {
    return null;
  }
}
