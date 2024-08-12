import { IsEnum, IsString, IsUrl, IsBoolean, IsNumber, Min, Max, IsOptional } from 'class-validator';
import { Gender, CaseShape } from './../schemas/watch.schema';

export class UpdateWatchDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsUrl()
  imageURL?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsEnum(CaseShape)
  caseShape?: CaseShape;

  @IsOptional()
  @IsBoolean()
  waterResistance?: boolean;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  discount?: number;
}
