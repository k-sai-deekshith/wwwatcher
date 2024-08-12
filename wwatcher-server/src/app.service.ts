import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Watch, WatchDocument } from './schemas/watch.schema';
import { CreateWatchDto } from './dto/create-watch.dto';
import { UpdateWatchDto } from './dto/update-watch.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Watch.name) private watchModel: Model<WatchDocument>,
  ) {}

  async createWatch(createWatchDto: CreateWatchDto): Promise<WatchDocument> {
    const createdWatch = new this.watchModel(createWatchDto);
    return createdWatch.save();
  }

  async findAllWatches(): Promise<WatchDocument[]> {
    return this.watchModel.find().exec();
  }

  async findOneWatch(id: string): Promise<WatchDocument> {
    return this.watchModel.findById(id).exec();
  }

  async updateWatch(
    id: string,
    updateWatchDto: UpdateWatchDto,
  ): Promise<WatchDocument> {
    return this.watchModel
      .findByIdAndUpdate(id, updateWatchDto, { new: true })
      .exec();
  }

  async removeWatch(id: string): Promise<WatchDocument> {
    return this.watchModel.findByIdAndDelete(id).exec();
  }

  async filterWatches(filters: {
    brands?: string[];
    caseShapes?: string[];
    waterResistance?: boolean;
    minPrice?: number;
    maxPrice?: number;
    searchText?: string;
  }): Promise<WatchDocument[]> {
    const query: any = {};

    if (filters.brands && filters.brands.length > 0) {
      query.brand = { $in: filters.brands };
    }

    if (filters.caseShapes && filters.caseShapes.length > 0) {
      query.caseShape = { $in: filters.caseShapes };
    }

    if (filters.waterResistance !== undefined) {
      query.waterResistance = filters.waterResistance;
    }

    if (filters.minPrice !== undefined) {
      query.price = { $gte: filters.minPrice };
    }
    if (filters.maxPrice !== undefined) {
      query.price = query.price ? { ...query.price, $lte: filters.maxPrice } : { $lte: filters.maxPrice };
    }

    if (filters.searchText && filters.searchText.trim() !== '') {
      const searchRegex = new RegExp(filters.searchText, 'i'); 
      query.$or = [
        { title: searchRegex },
        { brand: searchRegex },
      ];
    }

    return this.watchModel.find(query).exec();
  }
}
