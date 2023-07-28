import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Customer])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
