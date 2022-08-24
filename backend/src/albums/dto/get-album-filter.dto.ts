import { IsOptional, IsString } from 'class-validator';

export class GetAlbumFilterDto {
  @IsOptional()
  @IsString()
  name?: string;
  artist?: string;

  @IsOptional()
  skip?: number;

  @IsOptional()
  take?: number;
}
