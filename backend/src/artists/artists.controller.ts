import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Artist } from './artist.entity';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Controller('artists')
export class ArtistsController {
  constructor(private tasksService: ArtistsService) {}

  @Get()
  async getAll() {
    return await this.tasksService.getAll();
  }

  @Post()
  async create(@Body() artist: CreateArtistDto) {
    return await this.tasksService.create(artist);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(id);
  }
}
