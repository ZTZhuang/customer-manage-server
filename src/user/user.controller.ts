import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Request,
  UseGuards,
  ValidationPipe
} from '@nestjs/common';
import { RedisClientType } from 'redis';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginGuard } from 'src/login.guard';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  @Post('login')
  async login(@Body(ValidationPipe) user: LoginUserDto) {
    const foundUser = await this.userService.login(user);
    if (foundUser) {
      const token = await this.jwtService.signAsync({
        user: {
          id: foundUser.id,
          username: foundUser.username
        }
      });
      await this.redisClient.set(token, foundUser.id, { EX: 3600 * 24 });
      return { token };
    }
  }

  @Post('logout')
  @UseGuards(LoginGuard)
  async logout(@Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    await this.redisClient.del(token);
    return req.user;
  }

  @Get('info')
  @UseGuards(LoginGuard)
  async getInfo(@Request() req) {
    const info = await this.userService.findOne(+req.user.id);
    return info;
  }

  @Post()
  @UseGuards(LoginGuard)
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(LoginGuard)
  async findAll() {
    const list = await this.userService.findAll();
    return list.map((user: User) => {
      return {
        ...user,
        createTime: this.getFormattedTime(user.createTime),
        updateTime: this.getFormattedTime(user.updateTime),
        customers: user.customers.map(customer => {
          return {
            ...customer,
            createTime: customer.getFormattedCreateTime(),
            updateTime: customer.getFormattedCreateTime()
          };
        })
      };
    });
  }

  getFormattedTime(time): string {
    // 自定义时间格式化方式，这里以 'YYYY-MM-DD HH:mm:ss' 格式表示
    const formattedDate = `${time.getFullYear()}-${(time.getMonth() + 1).toString().padStart(2, '0')}-${time
      .getDate()
      .toString()
      .padStart(2, '0')} ${time.getHours().toString().padStart(2, '0')}:${time
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')}`;

    return formattedDate;
  }

  @Get(':id')
  @UseGuards(LoginGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(LoginGuard)
  update(@Param('id') id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(LoginGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
