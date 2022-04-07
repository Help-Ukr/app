import { computed, makeObservable, observable, runInAction } from 'mobx';
import { useMemo } from 'react';
import { Service } from 'typedi';
import { CollectinPointDto } from '~/dto/dto.collectionpoint';
import { MobXForm } from '~/lib/form';
import { CollectionPoint } from '~/model/collectionpoint.model';
import { ApiService } from './api.service';
import { AsyncService } from './base.service';

@Service()
export class ColletionPointsService extends AsyncService {
    readonly points = observable.array<CollectionPoint>([], { deep: false });

    constructor(private api: ApiService) {
        super();
        makeObservable(this);
    }

    @computed
    get point() {
        return this.points.at(0);
    }

    use = () => {
        this.useAsync(this.reload);
        return this;
    };

    reload = async () => {
        const pts = await this.api.get('/api/collect-point/my', {});
        runInAction(() => {
            this.points.replace(pts.map(pt => new CollectionPoint(pt)));
        });
    };

    useForm = (initialData?: Partial<CollectinPointDto>) => {
        return useMemo(
            () =>
                new MobXForm(CollectinPointDto, {
                    initialData,
                    onSubmit: data => {
                        console.log('onSubmit', data);
                    },
                }),
            [initialData],
        );
    };
}
