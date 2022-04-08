import { Exclude } from 'class-transformer';
import {
    IsBoolean,
    IsInt,
    IsLatitude,
    IsLongitude,
    IsOptional,
    Length,
    MaxLength,
    MinLength,
    ValidateNested,
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
    id!: number;
}
export class CollectinPointDto {
    @IsBoolean()
    enabled: boolean = false;

    @Length(3, 64)
    name: string = '';

    @ValidateNested()
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

    @ValidateNested({ each: true })
    items: NeededItemsDto[] = [];
}
