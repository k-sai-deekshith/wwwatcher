import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateWatchDto } from './dto/create-watch.dto';
import { UpdateWatchDto } from './dto/update-watch.dto';
import { WatchDocument } from './schemas/watch.schema';

@Controller('watches')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createWatch(@Body() createWatchDto: CreateWatchDto): Promise<WatchDocument> {
    return this.appService.createWatch(createWatchDto);
  }

  @Get('')
  async findWatch(): Promise<WatchDocument[]> {
    return this.appService.findAllWatches();
  }

  @Post('filter')
  async filterWatches(@Body() filters: {
    brands?: string[];
    caseShapes?: string[];
    waterResistance?: boolean;
    minPrice?: number;
    maxPrice?: number;
    searchText?: string;
  }): Promise<WatchDocument[]> {
    return this.appService.filterWatches(filters);
  }

  @Get(':id')
  async findOneWatch(@Param('id') id: string): Promise<WatchDocument> {
    return this.appService.findOneWatch(id);
  }

  @Put(':id')
  async updateWatch(
    @Param('id') id: string,
    @Body() updateWatchDto: UpdateWatchDto,
  ): Promise<WatchDocument> {
    return this.appService.updateWatch(id, updateWatchDto);
  }

  @Delete(':id')
  async removeWatch(@Param('id') id: string): Promise<WatchDocument> {
    return this.appService.removeWatch(id);
  }
}
