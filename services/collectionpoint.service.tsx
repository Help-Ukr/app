import { makeObservable, observable, runInAction } from 'mobx';
import { useMemo } from 'react';
import { O } from 'ts-toolbelt';
import { Service } from 'typedi';
import { MobXForm } from '~/lib/form';
import { CollectionPoint } from '~/model/collectionpoint.model';
import { CollectinPointDto } from '~/model/dto/dto.collectionpoint';
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
        this.useAsync(() => this.reload());
        return this;
    };

    reload = async () => {
        const pt = await this.api.get('/api/collect-point/my', {});
        if (!('204' in pt)) {
            runInAction(() => {
                this.point = new CollectionPoint(pt);
            });
        }
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

    private onSubmit = ({
        enabled,
        name,
        description,
        location,
        phone,
        telegram,
        instagram,
        needed_items,
    }: CollectinPointDto) => {
        const body: CollectinPointDto = {
            enabled,
            name,
            description,
            location,
            phone,
            telegram,
            instagram,
            needed_items,
        };
        this.async(async () => {
            if (this.point) {
                await this.api.patch('/api/collect-point', { body });
            } else {
                await this.api.post('/api/collect-point', { body });
            }
            return await this.reload();
        });
    };
}
