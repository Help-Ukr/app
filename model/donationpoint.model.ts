import { getDistance } from 'geolib';
import { computed, makeObservable } from 'mobx';
import { app } from '~/services/app';
import { LocationService } from '~/services/location.service';
import { BaseModel } from './base.model';

export class DonationPoint extends BaseModel.factory<API.CollectPoint>() {
    constructor(data: API.CollectPoint) {
        super(data);
        makeObservable(this);
    }

    @computed get distance() {
        const { position } = app.get(LocationService);
        return position ? getDistance(position, this.location) : 0;
    }

    @computed get distanceStr() {
        const { distance } = this;
        return distance > 1000 ? `${(distance / 1000).toFixed(2)}km` : `${distance.toFixed(0)}m`;
    }

    @computed get telegramLink() {
        return 'https://t.me/' + this.telegram?.replace(/^@/, '');
    }

    @computed get phoneLink() {
        return 'tel:' + this.phone;
    }

    @computed get instagramLink() {
        return 'https://instagram.com/' + this.instagram?.replace(/^@/, '');
    }

    @computed get navigateLink() {
        return `https://www.google.com/maps/dir/?api=1&destination=${this.location.latitude},${this.location.longitude}`;
    }

    share = () => {
        if (navigator.canShare && navigator.canShare()) {
            navigator.share({
                url: window.location.href,
                title: this.name,
                text: `Share text`,
            });
        } else {
            navigator.clipboard?.writeText('Clip text');
        }
    };
}
