import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as crypto from 'crypto';

function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  async login(user: LoginUserDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username
    });

    if (!foundUser) {
      throw new HttpException('用户名不存在', 0);
    }
    if (foundUser.password !== md5(user.password)) {
      throw new HttpException('密码错误', 0);
    }
    if (foundUser.forbidden) {
      throw new HttpException('账号已被停用，请联系管理员', 0);
    }
    return foundUser;
  }

  async create(createUserDto: CreateUserDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: createUserDto.username
    });
    if (foundUser) {
      throw new HttpException('用户已存在', 0);
    }

    try {
      await this.userRepository.save({
        ...createUserDto,
        password: md5(createUserDto.password),
        isAdmin: false,
        forbidden: false
      });
      return '注册成功';
    } catch (e) {
      throw new HttpException('注册失败', 0);
    }
  }

  findAll() {
    return this.userRepository.find({
      where: { isAdmin: false }
    });
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({
      id: id
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const data = updateUserDto.password
      ? {
          id,
          ...updateUserDto,
          password: md5(updateUserDto.password)
        }
      : {
          id,
          ...updateUserDto
        };
    return this.userRepository.save(data);
  }

  remove(id: number) {
    this.userRepository.delete(id);
  }
}
