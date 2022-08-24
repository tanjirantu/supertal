// import { IsNotEmpty } from 'class-validator';

import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFavoriteDto {
  @IsNotEmpty()
  label: string;

  @IsOptional()
  tracks: string[];
}
