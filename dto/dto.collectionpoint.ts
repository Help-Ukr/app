import { IsLatitude, IsLongitude, IsOptional, IsPhoneNumber, Length, ValidateNested } from 'class-validator';

class Loaction {
    @Length(3, 64)
    address: string = '';

    @IsLatitude()
    lat?: number;

    @IsLongitude()
    lng?: number;
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
    location: Loaction = {
        address: '',
    };
}
