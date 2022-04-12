import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import queryString from 'query-string';
import { Service } from 'typedi';
import { EventOrValue } from '~/lib/types';
import { DonationPoint } from '~/model/donationpoint.model';
import { ApiService } from './api.service';
import { AppUIService } from './appui.service';
import { AsyncService } from './base.service';

@Service()
export class DontationPointsService extends AsyncService {
    points = observable.array([] as DonationPoint[], { deep: false });

    @observable
    selectedId = 0;

    @computed
    get selected(): DonationPoint | undefined {
        return this.points.find(p => p.id === this.selectedId);
    }

    @observable
    filter = '';

    @computed
    get filtered() {
        const filt = this.filter.toLocaleLowerCase();
        const pts = filt
            ? this.points.filter(
                  p =>
                      p.name.toLocaleLowerCase().includes(filt) ||
                      p.location.address.toLocaleLowerCase().includes(filt),
              )
            : this.points;
        return pts.slice().sort((a, b) => a.distance - b.distance);
    }

    constructor(private api: ApiService, private appUi: AppUIService) {
        super();
        makeObservable(this);
        const { id } = queryString.parse(window.location.search);
        const i = +id!;
        if (i > 0) runInAction(() => (this.selectedId = i));
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

    @action
    setFilter = (e: EventOrValue) => {
        this.filter = typeof e === 'string' ? e : e.target.value;
    };

    @action
    resetFilter = () => {
        this.filter = '';
    };

    @action
    setSelected(pt: DonationPoint | undefined) {
        this.selectedId = pt?.id ?? 0;
        if (pt) {
            this.appUi.closeDonationSidebar();
            window.history.replaceState(null, '', '/donate?' + queryString.stringify({ id: pt.id }));
        } else {
            window.history.replaceState(null, '', '/donate');
        }
        this.log.debug('setSelected', pt);
    }
}
