import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class NftEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  logoUrl: string;

  @Column()
  nftId: number;

  @Column()
  userWalletAddress: string;
}
