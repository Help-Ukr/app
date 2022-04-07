import { action, makeObservable, observable, runInAction } from 'mobx';
import { Service } from 'typedi';
import { ItemCategory } from '~/model/itemcategory.model';
import { ApiService } from './api.service';
import { AsyncService } from './base.service';

export type CollectItem = ItemCategory & { items?: CollectItem[] };
@Service()
export class CollectItemsService extends AsyncService {
    items = observable.array<CollectItem>([], { deep: false });

    @observable
    openId?: number;

    constructor(private api: ApiService) {
        super();
        makeObservable(this);
        //        runInAction(() => this.items.replace(CollectItemsService.serialize(ITEM_CATEGORIES)));
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

    @action
    handleOpen = (id?: number) => {
        this.openId = id;
    };

    @action
    static serialize(items: ItemCategory[], parent?: number): CollectItem[] {
        const rv = items.filter(c => c.item_category_id === parent);
        return rv.map(item => ({ ...item, items: CollectItemsService.serialize(items, item.id) }));
    }
}
