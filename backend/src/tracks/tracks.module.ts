import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from '../albums/albums.module';
import { Track } from './track.entity';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { Artist } from '../artists/artist.entity';
import { Album } from '../albums/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Track, Artist, Album]), AlbumsModule],
  providers: [TracksService],
  controllers: [TracksController],
  exports: [TracksService],
})
export class TracksModule {}
