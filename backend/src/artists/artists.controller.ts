import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist-dto';

@Controller('artists')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  getAll() {
    return this.artistsService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.artistsService.getById(id);
  }

  @Post()
  create(@Body() artist: CreateArtistDto) {
    return this.artistsService.create(artist);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() artistDto: UpdateArtistDto) {
    return this.artistsService.update(id, artistDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.artistsService.remove(id);
  }
}
