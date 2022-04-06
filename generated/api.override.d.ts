namespace API {
    export type CollectPoint = API.components['schemas']['CollectPoint'];
    export type ItemCategory = API.components['schemas']['ItemCategory'];
    export interface components {
        schemas: {
            ItemCategory: {
                id?: number;
                name?: string;
                parent?: number;
                icon?: string;
            };
        };
    }
}
