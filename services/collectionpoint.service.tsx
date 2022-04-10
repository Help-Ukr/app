import { makeObservable, observable, runInAction } from 'mobx';
import { useMemo } from 'react';
import { O } from 'ts-toolbelt';
import { Service } from 'typedi';
import { CollectinPointDto } from '~/dto/dto.collectionpoint';
import { MobXForm } from '~/lib/form';
import { CollectionPoint } from '~/model/collectionpoint.model';
import { ApiService } from './api.service';
import { AsyncService } from './base.service';

@Service()
export class ColletionPointService extends AsyncService {
    @observable point?: CollectionPoint;

    constructor(private api: ApiService) {
        super();
        makeObservable(this);
    }

    use = () => {
        this.useAsync(this.reload);
        return this;
    };

    reload = async () => {
        const pt = await this.api.get('/api/collect-point/my', {});
        runInAction(() => {
            this.point = new CollectionPoint(pt as any);
        });
    };

    useForm = (initialData?: O.Partial<CollectinPointDto, 'deep'>) => {
        return useMemo(
            () =>
                new MobXForm(CollectinPointDto, {
                    initialData,
                    onSubmit: this.onSubmit,
                }),
            [initialData],
        );
    };

    private onSubmit = async ({
        enabled,
        name,
        location,
        phone,
        telegram,
        instagram,
        needed_items,
    }: CollectinPointDto) => {
        const body: CollectinPointDto = {
            enabled,
            name,
            location,
            phone,
            telegram,
            instagram,
            needed_items,
        };
        if (this.point) {
            await this.api.patch('/api/collect-point', { body });
        } else {
            await this.api.post('/api/collect-point', { body });
        }
        await this.reload();
    };
}
