import { validateSync } from 'class-validator';
import { action, makeObservable, observable, toJS } from 'mobx';

export class MobXFormField<T extends new (...any: any) => any, Dto extends InstanceType<T>> {
    label = `${this.dto.constructor.name}.${this.name}`;

    @observable
    value: any = undefined;

    constructor(private dto: Dto, public name: keyof T) {
        this.value = dto[name];
        makeObservable(this);
    }

    @action
    onChange = (value: any) => {
        this.value = value;
    };
}

export class MobXForm<T extends new (...any: any) => any, Dto extends InstanceType<T>> {
    protected fields = new Map<keyof T, MobXFormField<T, Dto>>();
    protected data = new this.Dto();

    constructor(protected Dto: T, private props?: { onSubmit: (data: Dto) => void }) {
        for (const f in this.data) {
            this.fields.set(f as any, new MobXFormField(this.data, f as any));
        }
    }

    get $() {
        const rv: MobXForm.FieldData<Dto> = {} as any;
        Array.from(this.fields).map(([key, field]) => {
            rv[key] = field;
        });
        return rv;
    }

    handleSubmit = () => {
        for (const f in this.data) {
            this.data[f] = toJS(this.fields.get(f as any)?.value);
        }
        const errors = validateSync(this.data);
        if (errors.length) {
            console.error('handleSubmit', { errors, data: this.data });
            return;
        } else {
            console.info('handleSubmit', { errors, data: this.data });
            this.props?.onSubmit(this.data);
        }
    };
}

export namespace MobXForm {
    export type FieldData<T = {}> = {
        [P in keyof T]-?: {
            name: P;
            label: string;
            value: T[P];
            onChange: (value: T[P]) => void;
        };
    };
    export interface InputProps<T = any> {
        name: string;
        label: string;
        value: T;
        onChange: (value: T) => void;
    }
}
