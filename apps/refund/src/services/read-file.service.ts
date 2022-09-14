import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import * as xlsx from 'xlsx';
import { AwsService } from './aws.service';

import * as rewrelice from 'newrelic';

type PayloadRefundType = {
  ruc: string;
  comercio: string;
  venta: string;
  monto: number;
  descripcion: string;
  keyFile: string;
};

@Injectable()
export class ReadFileService {
  constructor(
    private readonly awsService: AwsService,
    @Inject('REFUND_BUS_SERVICE') private client: ClientProxy,
  ) {}

  async readFileExcelSync(keyFile: string) {
    try {
      const fileBuffer = await this.awsService.dowloadFile(keyFile);

      const file = await xlsx.read(fileBuffer, { type: 'buffer' });

      const data: PayloadRefundType[] = [];

      const rowsJson = xlsx.utils.sheet_to_json(
        file.Sheets[file.SheetNames[0]],
      );

      rowsJson.forEach((row, index) => {
        if (index > 0) {
          const columns = Object.values(row);
          data.push({
            ruc: columns[0],
            comercio: columns[1],
            venta: columns[2],
            monto: Number(columns[3]),
            descripcion: columns[4],
            keyFile,
          });
        }
      });

      return data;
    } catch (error) {
      rewrelice.noticeError(error);
    }
  }

  async enviarColaDevolucion(payload: { key: string; url: string }) {
    const devoluciones = await this.readFileExcelSync(payload.key);

    for (const devolucion of devoluciones) {
      this.client.emit('new_refund', devolucion);
    }
  }
}
