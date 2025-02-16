import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  HttpException,
  HttpStatus,
  Logger,
  Res,
} from '@nestjs/common';
import e, { Response } from 'express'; // Import the response type for correct typing
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
  private readonly logger = new Logger(NftController.name); // Initialize logger

  constructor(private readonly nftService: NftService) {}

  @Post()
  @ApiOperation({ summary: 'Store NFT Data' })
  @ApiBody({ description: 'NFT data to store', type: CreateNftDto })
  @ApiResponse({ status: 201, description: 'NFT data stored successfully' })
  @ApiResponse({ status: 400, description: 'Error storing NFT data' })
  async storeNftData(
    @Body() createNftDto: CreateNftDto,
    @Res() res: Response,
  ): Promise<e.Response> {
    try {
      await this.nftService.storeNftData(createNftDto);
      this.logger.log('NFT data stored successfully');
      return res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'NFT data stored successfully',
      });
    } catch (error) {
      this.logger.error('Error storing NFT data', error.stack);
      throw new HttpException(
        { success: false, message: 'Error storing NFT data' },
        HttpStatus.BAD_REQUEST,
      );
    }
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
    try {
      const nfts = await this.nftService.getNftGallery(userWalletAddress);
      if (!nfts.length) {
        this.logger.warn(
          `No NFTs found for wallet address ${userWalletAddress}`,
        );
        throw new HttpException(
          { success: false, message: 'No NFTs found for this wallet address' },
          HttpStatus.NOT_FOUND,
        );
      }
      this.logger.log(
        `NFT gallery retrieved for wallet address ${userWalletAddress}`,
      );
      return nfts;
    } catch (error) {
      this.logger.error('Error retrieving NFT gallery', error.stack);
      throw new HttpException(
        { success: false, message: 'Error retrieving NFT gallery' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
    try {
      const nft = await this.nftService.getNftById(id);
      if (!nft) {
        this.logger.warn(`NFT with ID ${id} not found`);
        throw new HttpException(
          { success: false, message: 'NFT not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      this.logger.log(`NFT data retrieved for ID ${id}`);
      return nft;
    } catch (error) {
      this.logger.error('Error retrieving NFT data', error.stack);
      throw new HttpException(
        { success: false, message: 'Error retrieving NFT data' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
