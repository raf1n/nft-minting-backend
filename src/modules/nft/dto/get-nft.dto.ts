import { ApiProperty } from '@nestjs/swagger';

export class GetNftDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  logoUrl: string;

  @ApiProperty()
  nftId: number;

  @ApiProperty()
  userWalletAddress: string;
}
