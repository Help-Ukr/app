import { makeObservable, observable, runInAction } from 'mobx';
import { Service } from 'typedi';
import { ItemCategory } from '~/model/itemcategory.model';
import { ApiService } from './api.service';
import { AsyncService } from './base.service';

@Service()
export class CollectItemsService extends AsyncService {
    items = observable.array<ItemCategory>([], { deep: false });

    constructor(private api: ApiService) {
        super();
        makeObservable(this);
    }

    use() {
        this.useAsync(this.reload);
        return this;
    }

    reload = async () => {
        const cis = await this.api.get('/api/item-category', { query: {} });
        runInAction(() => {
            this.items.replace(cis.map(p => new ItemCategory(p)));
        });
    };
}
