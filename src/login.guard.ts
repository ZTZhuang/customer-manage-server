import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { RedisClientType } from 'redis';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const authorization = request.header('authorization') || '';

    const bearer = authorization.split(' ');

    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException('用户未登录或登录过期');
    }

    const token = bearer[1];

    try {
      const value = await this.redisClient.get(token);
      if (value) {
        (request as any).user = { id: value };
      } else {
        throw new UnauthorizedException('登录 token 失效，请重新登录');
      }
      // const info = this.jwtService.verify(token);
      // (request as any).user = info.user;
    } catch (e) {
      throw new UnauthorizedException('登录 token 失效，请重新登录');
    }

    return true;
  }
}
