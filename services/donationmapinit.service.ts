import { autorun } from 'mobx';
import { useEffect } from 'react';
import { Service } from 'typedi';
import { DontationPointsService } from './donationpoints.service';
import { MapService } from './map.service';
import { UserLocationService } from './userlocation.service';

@Service()
export class DonationMapInitService {
    constructor(
        private map: MapService,
        private points: DontationPointsService,
        private location: UserLocationService,
    ) {}

    use() {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            return autorun(() => {
                if (this.location.position) {
                    !this.points.selectedId && !this.done && this.map.center(this.location.position);
                    this.done = true;
                }
            });
        }, []);
    }

    private done = false;
}
