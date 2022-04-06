import {
    IsLatitude,
    IsLongitude,
    IsOptional,
    IsPhoneNumber,
    Length,
    MaxLength,
    MinLength,
    ValidateNested,
} from 'class-validator';

class LocationDto {
    @MinLength(3)
    @MaxLength(512)
    address: string = '';

    @IsLatitude()
    lat: number = 0;

    @IsLongitude()
    lng: number = 0;
}

export class CollectinPointDto {
    @Length(3, 64)
    orgName: string = '';

    @IsPhoneNumber('UA') // TODO: UA
    phone: string = '';

    @Length(3, 64)
    @IsOptional()
    telegram?: string;

    @ValidateNested()
    location: LocationDto = {
        address: '',
        lat: 0,
        lng: 0,
    };
}
