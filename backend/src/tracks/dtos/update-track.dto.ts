import { IsNotEmpty } from 'class-validator';

export class UpdateTrackDto {
  @IsNotEmpty()
  name: string;
}
