import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  getHello(): string {
    return this.notificationService.getHello();
  }

  @MessagePattern('send_message')
  getNotifications(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(context.getPattern());
    this.notificationService.notificarMessage(data);
  }
}
