import { Body, Controller, Post, Request } from '@nestjs/common';
import {
  ConsultaDeudaDto,
  ConsultaMovFechaDto,
  DevolucionDto,
  TokenDto,
} from './dto';
import { RefundService } from './refund.service';

@Controller()
export class RefundController {
  constructor(private readonly refundService: RefundService) {}

  @Post('token')
  async getToken(@Body() tokenPayload: TokenDto, @Request() req) {
    const token = req.headers.authorization;
    return this.refundService.getToken(tokenPayload, token);
  }

  @Post('consulta-deuda')
  async obtenerDeuda(@Body() consultaDto: ConsultaDeudaDto) {
    return this.refundService.consultaDeuda(consultaDto);
  }

  @Post('consulta-mov-fecha')
  async consultarMovxFecha(@Body() dto: ConsultaMovFechaDto, @Request() req) {
    const token = req.headers.authorization;
    return this.refundService.consultarMovxFecha(dto, token);
  }

  @Post('generar-devolucion')
  async generarDevolucion(@Body() dto: DevolucionDto) {
    return this.refundService.generarDevolucion(dto);
  }
}
