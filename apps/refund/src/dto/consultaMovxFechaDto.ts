import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class ConsultaMovFechaDto {
  @IsNotEmpty()
  @IsString()
  pCodComercio: string;

  @IsNotEmpty()
  @IsDateString()
  pFecTrxIni: string;

  @IsNotEmpty()
  @IsDateString()
  pFecTrxFin: string;

  @IsNotEmpty()
  @IsString()
  pOrigen: string;

  @IsNotEmpty()
  @IsString()
  pModulo: string;

  @IsNotEmpty()
  @IsString()
  pUsuario: string;
}
