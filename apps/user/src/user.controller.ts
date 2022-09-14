import { RmqService } from '@app/common';
import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @MessagePattern('notification_message')
  getMessage(@Payload() data: number[], @Ctx() context: RmqContext) {
    console.log(`${context.getPattern()}`);
    this.userService.notificar(data);
  }
}
