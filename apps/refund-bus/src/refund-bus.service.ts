import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as rewrelice from 'newrelic';
import { map } from 'rxjs';

export type PayloadRefundType = {
  ruc: string;
  comercio: string;
  venta: string;
  monto: number;
  descripcion: string;
  keyFile: string;
};

@Injectable()
export class RefundBusService {
  private logger = new Logger(RefundBusService.name);
  private hostApiRefund: string;
  private userKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpClient: HttpService,
  ) {
    this.hostApiRefund = this.configService.get('HOST_URL_MS_REFUND');
    this.userKey = this.configService.get('USER_KEY');
  }

  procesarDevolucion(payload: PayloadRefundType) {
    try {
      const data = JSON.stringify(payload);

      rewrelice.addCustomAttributes({
        ...payload,
      });

      this.httpClient
        .post(`${this.hostApiRefund}/bo/devolucion/devolucioncupon`, data, {
          headers: {
            'user-key': this.userKey,
          },
        })
        .pipe(map((res) => res.data))
        .subscribe((result) => {
          console.log('Resultado de consulta', JSON.stringify(result));
        });
      console.log(payload);
    } catch (error) {
      this.log('Error la obtener consulta deuda', error);
    }
  }

  log(message: string, err: any) {
    console.log(err);
    rewrelice.noticeError(err);
    this.logger.error(`${message}: ${JSON.stringify(err)}`);
  }
}
