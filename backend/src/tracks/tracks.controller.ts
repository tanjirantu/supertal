import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateTrackDto } from './dtos/create-track.dto';
import { GetTrackFilterDto } from './dtos/get-track-filter.dto';
import { UpdateTrackDto } from './dtos/update-track.dto';
import { TracksService } from './tracks.service';

@Controller('tracks')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  getAll(@Query() filter: GetTrackFilterDto) {
    return this.tracksService.getAll(filter);
  }

  @Get('/:id')
  get(@Param('id') id: string) {
    return this.tracksService.get(id);
  }

  @Post()
  create(@Body() track: CreateTrackDto) {
    return this.tracksService.create(track);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() track: UpdateTrackDto) {
    return this.tracksService.update(id, track);
  }
}
