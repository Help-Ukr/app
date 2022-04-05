import { IsLatitude, IsLongitude, IsOptional, IsPhoneNumber, Length, ValidateNested } from 'class-validator';

class LocationDto {
    @Length(3, 512)
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

    @Length(1, 64)
    @IsOptional()
    telegram?: string;

    @ValidateNested()
    location: LocationDto = {
        address: '',
        lat: 0,
        lng: 0,
    };
}
