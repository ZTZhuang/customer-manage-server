import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './response.Interceptor';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { Customer } from './customer/entities/customer.entity';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'customer_manage',
      synchronize: true,
      logging: true,
      entities: [User, Customer],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password'
      }
    }),
    JwtModule.register({
      global: true,
      secret: 'jwt_login_secret',
      signOptions: {
        expiresIn: '1d'
      }
    }),
    RedisModule,
    CustomerModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    }
  ]
})
export class AppModule {}
