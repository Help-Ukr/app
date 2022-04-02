import { makeObservable, observable, runInAction } from 'mobx';
import { Service } from 'typedi';
import { DonationPoint } from '~/model/donationpoint.model';
import { ApiService } from './api.service';
import { AsyncService } from './base.service';

@Service()
export class DontationPointsService extends AsyncService {
    points = observable.array([] as DonationPoint[], { deep: false });

    constructor(private api: ApiService) {
        super();
        makeObservable(this);
    }

    use() {
        this.useAsync(this.reload);
        return this;
    }

    reload = async () => {
        const pts = await this.api.get('/api/collect-point', { query: {} });
        runInAction(() => {
            this.points.replace(pts.map(p => new DonationPoint(p)));
        });
    };
}
