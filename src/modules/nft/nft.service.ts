import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNftDto } from './dto/create-nft.dto';
import { NftEntity } from './entities/nft.entity'; // Import the DTO

@Injectable()
export class NftService {
  constructor(
    @InjectRepository(NftEntity)
    private nftRepository: Repository<NftEntity>,
  ) {}

  async storeNftData(createNftDto: CreateNftDto): Promise<NftEntity> {
    const nft = this.nftRepository.create(createNftDto);

    try {
      return await this.nftRepository.save(nft);
    } catch (error) {
      throw new Error('Error storing NFT data');
    }
  }

  async getNftById(id: number): Promise<NftEntity> {
    const nft = await this.nftRepository.findOne({ where: { nftId: id } });

    if (!nft) {
      throw new NotFoundException('NFT not found');
    }
    return nft;
  }

  async getNftGallery(userWalletAddress: string): Promise<NftEntity[]> {
    const nfts = await this.nftRepository.find({
      where: { userWalletAddress },
    });

    if (!nfts.length) {
      throw new NotFoundException('No NFTs found for this wallet address');
    }
    return nfts;
  }
}
