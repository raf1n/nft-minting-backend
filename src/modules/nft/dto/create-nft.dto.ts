import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl, IsNumber } from 'class-validator';

export class CreateNftDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  logoUrl: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  nftId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userWalletAddress: string;
}
