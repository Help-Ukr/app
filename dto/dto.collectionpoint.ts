import { IsLatitude, IsLongitude, IsOptional, IsPhoneNumber, Length, ValidateNested } from 'class-validator';

class LocationDto {
    @Length(3, 64)
    address: string = '';

    @IsLatitude()
    lat: number = 52.5188239;

    @IsLongitude()
    lng: number = 13.4012708;
}

export class CollectinPointDto {
    @Length(3, 64)
    orgName: string = '';

    @IsPhoneNumber('UA') // TODO: UA
    phone: string = '';

    @Length(1, 64)
    @IsOptional()
    telegram?: string;

    @ValidateNested()
    location = new LocationDto();
}
