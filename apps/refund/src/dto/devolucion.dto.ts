import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

class AuditDto {
  @IsNotEmpty()
  @IsString()
  appId: string;

  @IsNotEmpty()
  @IsString()
  usuario: string;

  @IsNotEmpty()
  @IsString()
  ipServidor: string;

  @IsNotEmpty()
  @IsString()
  transaccionId: string;

  @IsNotEmpty()
  @IsString()
  origen: string;
}

class ComercioDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  ruc: string;

  @IsNotEmpty()
  @IsString()
  segmento: string;
}

class DetailDevolucionDto {
  @IsNotEmpty()
  @IsString()
  moneda: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  monto: number;

  @IsNotEmpty()
  @IsString()
  usuarioRegistro: string;
}

class TarjetaDto {
  @IsNotEmpty()
  @IsString()
  marca: string;

  @IsNotEmpty()
  @IsString()
  nroTarjeta: string;
}

class TransaccionDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  fechaTransaccion: string;

  @IsNotEmpty()
  @IsString()
  moneda: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  monto: number;

  @ValidateNested({ each: true })
  @Type(() => TarjetaDto)
  tarjeta: TarjetaDto;
}

class RegistroDevolucionRequestDto {
  @ValidateNested({ each: true })
  @Type(() => ComercioDto)
  comercio: ComercioDto;

  @ValidateNested({ each: true })
  @Type(() => TransaccionDto)
  transaccion: TransaccionDto;

  @ValidateNested({ each: true })
  @Type(() => DetailDevolucionDto)
  devolucion: DetailDevolucionDto;

  @IsBoolean()
  isMassiveRefund: boolean;
}

export class DevolucionDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AuditDto)
  audit: AuditDto;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => RegistroDevolucionRequestDto)
  registroDevolucionRequest: RegistroDevolucionRequestDto;
}
