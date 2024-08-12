import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEnum, IsString, IsUrl, IsBoolean, IsNumber, Min, Max } from 'class-validator';

export type WatchDocument = Watch & Document;

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Unisex = 'Unisex',
}

export enum CaseShape {
  Oval = 'Oval',
  Square = 'Square',
  Circular = 'Circular',
  Rectangle = 'Rectangle',
}

@Schema()
export class Watch {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  @IsUrl()
  imageURL: string;

  @Prop({ type: String, enum: Gender, required: true })
  @IsEnum(Gender)
  gender: Gender;

  @Prop({ type: String, required: true })
  brand: string;

  @Prop({ type: String, enum: CaseShape, required: true })
  @IsEnum(CaseShape)
  caseShape: CaseShape;

  @Prop({ type: Boolean, required: true })
  @IsBoolean()
  waterResistance: boolean;

  @Prop({ type: Number, required: true })
  @IsNumber()
  price: number;

  @Prop({ type: Number, required: true, min: 0, max: 100 })
  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number;
}

export const WatchSchema = SchemaFactory.createForClass(Watch);
