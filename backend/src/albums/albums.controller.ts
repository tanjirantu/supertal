import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Album } from './album.entity';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { GetAlbumFilterDto } from './dto/get-album-filter.dto';

@Controller('albums')
export class AlbumsController {
  constructor(private serv: AlbumsService) {}

  @Get()
  getAll(@Query() filterDto: GetAlbumFilterDto) {
    return this.serv.getAll(filterDto);
  }

  @Post()
  create(@Body() album: CreateAlbumDto): Promise<Album> {
    return this.serv.create(album);
  }
}
