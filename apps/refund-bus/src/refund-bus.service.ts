import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map } from 'rxjs';

import * as rewrelice from 'newrelic';
import { ClientProxy } from '@nestjs/microservices';
import { REFUND_SERVICE } from '@app/common';

export type PayloadRefundType = {
  ruc: string;
  comercio: string;
  venta: string;
  monto: number;
  descripcion: string;
  keyFile: string;
  intento: number;
};

@Injectable()
export class RefundBusService {
  private logger = new Logger(RefundBusService.name);
  private hostApiRefund: string;
  private userKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpClient: HttpService,
    @Inject(REFUND_SERVICE) private client: ClientProxy,
  ) {
    this.hostApiRefund = this.configService.get('HOST_URL_MS_REFUND');
    this.userKey = this.configService.get('USER_KEY');
  }

  async procesarDevolucion(payload: PayloadRefundType) {
    try {
      const data = JSON.stringify({
        audit: {
          appId: 'DEVO002V1',
          usuario: 'OMNICHANNEL',
          ipServidor: '127.0.0.1',
          transaccionId: '159220260624408',
          origen: 'OMNICHANNEL',
        },
        registroDevolucionRequest: {
          comercio: {
            id: payload.comercio.toString(),
            ruc: payload.ruc.toString(),
            segmento: 'C',
          },
          transaccion: {
            id: payload.venta.toString(),
            fechaTransaccion: '2022-05-10',
            moneda: 'PEN',
            monto: 260,
            tarjeta: {
              marca: 'MC',
              nroTarjeta: '547880******6236',
            },
          },
          devolucion: {
            moneda: 'PEN',
            monto: payload.monto,
            usuarioRegistro: 'admdevosol01@yopmail.com',
          },
          isMassiveRefund: true,
        },
      });

      rewrelice.addCustomAttributes({
        ...payload,
      });

      this.httpClient
        .post(`${this.hostApiRefund}/bo/devolucion/devolucioncupon`, data, {
          headers: {
            'user-key': this.userKey,
          },
        })
        // .toPromise();
        .pipe(
          catchError((error) => {
            // rewrelice.noticeError(error);
            // rewrelice.addCustomAttributes({
            //   refundError: true,
            //   ...error,
            // });
            throw {
              data: error.response?.data || {},
              status: error.response.status,
            };
          }),
          map((res) => res.data),
        )
        .subscribe((result) => {
          console.log('Resultado de consulta', JSON.stringify(result));
        });
    } catch (error) {
      // rewrelice.addCustomAttributes({
      //   refundError: true,
      //   ...error,
      // });
      if (error?.status && error.status === 503) {
        if (payload.intento <= 3)
          this.volverEnviarCola({ ...payload, intento: payload.intento + 1 });
      }
      this.log('Error al processar devolucion', error);
    }
  }

  volverEnviarCola(payload: PayloadRefundType) {
    this.client.emit('retun_refund', payload);
  }

  log(message: string, err: any) {
    console.log(err);
    rewrelice.noticeError(err);
    this.logger.error(`${message}: ${JSON.stringify(err)}`);
  }
}
