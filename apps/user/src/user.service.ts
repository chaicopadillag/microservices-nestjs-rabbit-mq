import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  getHello(): string {
    return 'Hello World!';
  }

  async notificar(data: any) {
    this.logger.log(JSON.stringify(data));
  }
}
