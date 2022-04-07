import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { Service } from 'typedi';
import { EventOrValue } from '~/lib/types';
import { DonationPoint } from '~/model/donationpoint.model';
import { ApiService } from './api.service';
import { AsyncService } from './base.service';
import { MapService } from './map.service';

@Service()
export class DontationPointsService extends AsyncService {
    points = observable.array([] as DonationPoint[], { deep: false });

    @observable.ref
    selected?: DonationPoint;

    @observable
    filter = '';

    @computed
    get filtered() {
        const filt = this.filter.toLowerCase();
        const pts = filt ? this.points.filter(p => p.name.toLowerCase().includes(filt)) : this.points;
        return pts.slice().sort((a, b) => a.distance - b.distance);
    }

    constructor(private api: ApiService, private map: MapService) {
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
            for (let i = 0; i < 10; i++) {
                const pt = Object.assign({}, pts[i] ?? pts[0]);
                pt.location = Object.assign({}, pts[i]?.location ?? pts[0].location);
                pt.id = i;
                pt.location!.latitude! = +pt.location!.latitude! + Math.random();
                pt.location!.longitude! = +pt.location!.longitude! + Math.random();
                this.points.push(new DonationPoint(pt as any));
            }
            //            this.points.replace(pts.map(p => new DonationPoint(p as any)));
        });
    };

    @action
    setFilter = (e: EventOrValue) => {
        this.filter = typeof e === 'string' ? e : e.target.value;
    };

    @action
    setSelected(pt: DonationPoint | undefined) {
        this.selected = pt;
        if (pt) this.map.center({ lat: pt.location.latitude, lng: pt.location.longitude });
        this.log.debug('setSelected', pt);
    }
}
