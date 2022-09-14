import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { S3 } from 'aws-sdk';

@Injectable()
export class AwsService {
  private aws_access_key_id: string;
  private aws_api_version: string;
  private aws_region: string;
  private aws_secret_access_key: string;
  private aws_bucket_name: string;

  constructor(private readonly config: ConfigService) {
    this.aws_access_key_id = this.config.get<string>('AWS_ACCESS_KEY_ID');
    this.aws_api_version = this.config.get<string>('AWS_API_VERSION');
    this.aws_region = this.config.get<string>('AWS_REGION');
    this.aws_secret_access_key = this.config.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );
    this.aws_bucket_name = this.config.get<string>('AWS_BUCKET_NAME');
  }

  async uploadFile(fileBuffer: Buffer, filename: string) {
    try {
      const s3 = new S3({
        credentials: {
          accessKeyId: this.aws_access_key_id,
          secretAccessKey: this.aws_secret_access_key,
        },
        region: this.aws_region,
        apiVersion: this.aws_api_version,
      });

      const uploadResult = await s3
        .upload({
          Bucket: this.aws_bucket_name,
          Body: fileBuffer,
          Key: filename,
        })
        .promise();

      return {
        key: uploadResult.Key,
        url: uploadResult.Location,
      };
    } catch (error) {
      console.log(error);
      return { message: 'error upload file' };
    }
  }
}
