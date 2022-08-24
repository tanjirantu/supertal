import { IsOptional, IsString } from 'class-validator';

export class GetTrackFilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  artist?: string;

  @IsOptional()
  @IsString()
  album?: string;

  @IsOptional()
  skip?: number;

  @IsOptional()
  take?: number;
}
