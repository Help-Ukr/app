import { BaseModel } from './base.model';

export class CollectionPoint extends BaseModel.factory<API.CollectPoint>() {
    constructor(data: API.CollectPoint) {
        super(data);
    }
}
