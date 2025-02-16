import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { NftService } from './nft.service';
import { CreateNftDto } from './dto/create-nft.dto'; // Import the DTO
import { GetNftDto } from './dto/get-nft.dto'; // Import response DTO
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('NFT')
@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Post()
  @ApiOperation({ summary: 'Store NFT Data' })
  @ApiBody({ description: 'NFT data to store', type: CreateNftDto })
  @ApiResponse({ status: 201, description: 'NFT data stored successfully' })
  @ApiResponse({ status: 400, description: 'Error storing NFT data' })
  async storeNftData(
    @Body() createNftDto: CreateNftDto,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.nftService.storeNftData(createNftDto);
      return { success: true, message: 'NFT data stored successfully' };
    } catch (error) {
      return { success: false, message: 'Error storing NFT data' };
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get NFT Data by ID' })
  @ApiResponse({
    status: 200,
    description: 'NFT data retrieved successfully',
    type: GetNftDto,
  })
  @ApiResponse({ status: 404, description: 'NFT not found' })
  async getNftById(@Param('id') id: number): Promise<GetNftDto> {
    return await this.nftService.getNftById(id);
  }

  @Get('gallery')
  @ApiOperation({ summary: 'Get NFT Gallery for a User' })
  @ApiQuery({
    name: 'userWalletAddress',
    required: true,
    type: String,
    description: 'The wallet address of the user',
  })
  @ApiResponse({
    status: 200,
    description: 'NFT gallery retrieved successfully',
    type: [GetNftDto],
  })
  @ApiResponse({
    status: 404,
    description: 'No NFTs found for this wallet address',
  })
  async getNftGallery(
    @Query('userWalletAddress') userWalletAddress: string,
  ): Promise<GetNftDto[]> {
    return await this.nftService.getNftGallery(userWalletAddress);
  }
}
