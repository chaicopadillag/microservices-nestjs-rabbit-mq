import { Type } from 'class-transformer';
import {
  IsEmail,
  IsIP,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

class AuditDto {
  @IsNotEmpty()
  @IsString()
  appId: string;

  @IsNotEmpty()
  @IsEmail()
  usuario: string;

  @IsNotEmpty()
  @IsIP()
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
  @Length(11, 11)
  ruc: string;
}

class ConsultaDeudaRequestDto {
  @ValidateNested({ each: true })
  @Type(() => ComercioDto)
  comercio: ComercioDto;
}

export class ConsultaDeudaDto {
  @ValidateNested({ each: true })
  @Type(() => AuditDto)
  audit: AuditDto;

  @ValidateNested({ each: true })
  @Type(() => ConsultaDeudaRequestDto)
  consultaDeudaRequest: ConsultaDeudaRequestDto;
}
