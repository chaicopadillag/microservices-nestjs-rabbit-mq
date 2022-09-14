import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs';

import * as rewrelice from 'newrelic';

import {
  ConsultaDeudaDto,
  TokenDto,
  ConsultaMovFechaDto,
  DevolucionDto,
} from './dto';

@Injectable()
export class RefundService {
  private logger = new Logger(RefundService.name);
  private hostApiRefund: string;
  private hostApiAuth: string;
  private userKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpClient: HttpService,
  ) {
    this.hostApiRefund = this.configService.get('HOST_URL_MS_REFUND');
    this.hostApiAuth = this.configService.get('HOST_URL_MS_AUTH');
    this.userKey = this.configService.get('USER_KEY');
  }

  async getToken(tokenPayload: TokenDto, token: string) {
    try {
      const formParam = new URLSearchParams();
      formParam.append('client_id', tokenPayload.client_id);
      formParam.append('client_secret', tokenPayload.client_secret);
      formParam.append('grant_type', tokenPayload.grant_type);

      return this.httpClient
        .post(this.hostApiAuth, formParam, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'user-key': this.userKey,
            Authorization: token,
          },
        })
        .pipe(map((res) => res.data));
    } catch (error) {
      this.log('error al obtner token', error);
    }
  }

  async consultaDeuda(consultaDeudaDto: ConsultaDeudaDto) {
    try {
      const data = JSON.stringify(consultaDeudaDto);

      rewrelice.addCustomAttributes({
        ...consultaDeudaDto,
      });

      return this.httpClient
        .post(`${this.hostApiRefund}/bo/devoluciones/consultaDeuda`, data, {
          headers: {
            'user-key': this.userKey,
          },
        })
        .pipe(map((res) => res.data));
    } catch (error) {
      this.log('Error la obtener consulta deuda', error);
    }
  }

  async consultarMovxFecha(dto: ConsultaMovFechaDto, token: string) {
    const data = JSON.stringify(dto);
    try {
      rewrelice.addCustomAttributes({
        ...dto,
      });

      return this.httpClient
        .post(`${this.hostApiRefund}/devoluciones/consultarMovxFecha`, data, {
          headers: {
            'user-key': this.userKey,
            'Content-Type': 'application/json',
            token,
          },
        })
        .pipe(map((res) => res.data));
    } catch (error) {
      this.log('Error al consultar por fecha', error);
    }
  }

  async generarDevolucion(dto: DevolucionDto) {
    const data = JSON.stringify(dto);
    try {
      return this.httpClient
        .post(`${this.hostApiRefund}/bo/devolucion/devolucioncupon`, data, {
          headers: {
            'user-key': this.userKey,
            'Content-Type': 'application/json',
          },
        })
        .pipe(map((res) => res.data));
    } catch (error) {
      this.log('Error al consultar por fecha', error);
    }
  }

  log(message: string, err: any) {
    console.log(err);
    rewrelice.noticeError(err);
    this.logger.error(`${message}: ${JSON.stringify(err)}`);
  }
}
