import {
  Controller,
  Post,
  UnprocessableEntityException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { fileFilter } from './helpers';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload-refunds')
  @UseInterceptors(FileInterceptor('file', { fileFilter }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file)
      throw new UnprocessableEntityException('Please upload a excel file');

    return this.filesService.uploadRefundsFile(file);
  }
}
