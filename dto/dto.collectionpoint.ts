import { Exclude } from 'class-transformer';
import {
    IsBoolean,
    IsDefined,
    IsInt,
    IsLatitude,
    IsLongitude, IsOptional,
    Length,
    MaxLength,
    MinLength,
    ValidateNested
} from 'class-validator';

class LocationDto {
    @MinLength(3)
    @MaxLength(512)
    address!: string;

    @IsLatitude()
    latitude!: number;

    @IsLongitude()
    longitude!: number;
}

class ImageDto {
    dataUrl?: string;
    file?: File;
}

class NeededItemsDto {
    @IsInt()
    item_category_id!: number;
}
export class CollectinPointDto {
    @IsBoolean()
    enabled: boolean = false;

    @Length(3, 64)
    name: string = '';

    @ValidateNested()
    @IsDefined()
    location!: LocationDto;

    @Length(6, 18)
    phone: string = '';

    @Length(0, 64)
    @IsOptional()
    telegram?: string;

    @Length(0, 64)
    @IsOptional()
    instagram?: string;

    @ValidateNested()
    @IsOptional()
    @Exclude()
    imageFile?: ImageDto;

    needed_items: NeededItemsDto[] = [];
}
