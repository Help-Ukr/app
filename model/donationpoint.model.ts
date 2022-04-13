import { getDistance } from 'geolib';
import { computed, makeObservable } from 'mobx';
import { GeoPosition } from '~/lib/types';
import { app } from '~/services/app';
import { EnvService } from '~/services/env.service';
import { NotificationService } from '~/services/notification.service';
import { UserLocationService } from '~/services/userlocation.service';
import { getTr } from '~/texts';
import { BaseModel } from './base.model';

export class DonationPoint extends BaseModel.factory<API.CollectPoint>() {
    constructor(data: API.CollectPoint) {
        super(data);
        makeObservable(this);
    }

    @computed get items() {
        return this.needed_items.slice().sort((a, b) => a.item_category_name!.localeCompare(b.item_category_name!));
    }

    @computed get img() {
        return 'https://picsum.photos/300/300?random=' + Math.random();
    }

    @computed get geoPosition(): GeoPosition {
        return { lat: this.location.latitude, lng: this.location.longitude };
    }

    @computed get distance() {
        const { position } = app.get(UserLocationService);
        return position ? getDistance(position, this.location) : 0;
    }

    @computed get distanceStr() {
        const { distance } = this;
        return distance > 1000 ? `${(distance / 1000).toFixed(2)}km` : `${distance.toFixed(0)}m`;
    }

    @computed get telegramLink() {
        return this.telegram ? 'https://t.me/' + this.telegram.replace(/^@/, '') : '';
    }

    @computed get phoneLink() {
        return 'tel:' + this.phone;
    }

    @computed get instagramLink() {
        return this.instagram ? 'https://instagram.com/' + this.instagram.replace(/^@/, '') : '';
    }

    @computed get navigateLink() {
        return `https://www.google.com/maps/dir/?api=1&destination=${this.location.latitude},${this.location.longitude}`;
    }

    @computed get url() {
        return `${app.get(EnvService).NEXT_PUBLIC_DOMAIN}/donate?id=${this.id}`;
    }

    share = () => {
        const text = getTr('pointDetails')('shareContent', {
            addr: this.location.address,
            insta: this.instagramLink,
            phone: this.phone,
            tg: this.telegramLink,
            url: this.url,
            name: this.name,
        });
        if (this.canShare) {
            navigator
                .share({
                    title: this.name,
                    text,
                })
                .catch(err => {
                    if (err instanceof DOMException && err.code === err.ABORT_ERR) return;
                    console.error(err);
                    app.get(NotificationService).notify({ message: err.message });
                });
        } else {
            navigator.clipboard?.writeText(text).then(
                () => {
                    app.get(NotificationService).notify({
                        message: getTr('pointDetails')('copied'),
                        autoHideDuration: 5000,
                    });
                },
                err => {
                    if (err instanceof DOMException && err.code === err.ABORT_ERR) return;
                    console.error(err);
                    app.get(NotificationService).notify({ message: err.message });
                },
            );
        }
    };

    get canShare() {
        return !!navigator.share;
    }
}
