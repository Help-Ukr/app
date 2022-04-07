import { getDistance } from 'geolib';
import { computed, makeObservable } from 'mobx';
import { O } from 'ts-toolbelt';
import { Key } from 'ts-toolbelt/out/Any/Key';
import { app } from '~/services/app';
import { LocationService } from '~/services/location.service';
import { BaseModel } from './base.model';

export class DonationPoint extends BaseModel.factory<O.Required<API.CollectPoint, Key, 'deep'>>() {
    constructor(data: O.Required<API.CollectPoint, Key, 'deep'>) {
        super(data);
        makeObservable(this);
    }

    @computed
    get distance() {
        const { position } = app.get(LocationService);
        return position ? getDistance(position, this.location) : 0;
    }

    @computed
    get distanceStr() {
        const { distance } = this;
        return distance > 1000 ? `${(distance / 1000).toFixed(2)}km` : `${distance.toFixed(0)}m`;
    }
}
