import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  getHello(): string {
    return this.messageService.getHello();
  }

  @Post('send-message')
  async sendMessage(@Body() body: any) {
    return this.messageService.sendMessage(body);
  }
}
