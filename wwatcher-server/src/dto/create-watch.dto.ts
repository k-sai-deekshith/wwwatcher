import { IsEnum, IsString, IsUrl, IsBoolean, IsNumber, Min, Max } from 'class-validator';
import { Gender, CaseShape } from './../schemas/watch.schema';

export class CreateWatchDto {
  @IsString()
  title: string;

  @IsUrl()
  imageURL: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  brand: string;

  @IsEnum(CaseShape)
  caseShape: CaseShape;

  @IsBoolean()
  waterResistance: boolean;

  @IsNumber()
  price: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number;
}
