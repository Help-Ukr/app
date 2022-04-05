import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { action, makeObservable, observable, toJS } from 'mobx';
import { O } from 'ts-toolbelt';

export class MobXFormField<T extends new (...any: any) => any, Dto extends InstanceType<T>> {
    constructor(private dto: Dto, public name: keyof T) {
        this.value = dto[name];
        makeObservable(this);
    }

    @observable readonly label = `${this.dto.constructor.name}.${this.name}`;
    @observable readonly value: any = undefined;

    @observable readonly error: boolean = false;

    @observable readonly helperText: string = '';

    @action onChange = (value: any) => {
        this.self.value = value;
    };

    @action setHelperText = (text: string = '') => {
        this.self.helperText = text;
    };

    @action setError = (value = false) => {
        this.self.error = value;
    };

    private get self(): O.Writable<this> {
        return this as any;
    }
}

export class MobXForm<T extends new (...any: any) => any, Dto extends InstanceType<T>> {
    protected readonly fields = new Map<keyof T, MobXFormField<T, Dto>>();
    protected readonly data = new this.Dto();

    constructor(protected Dto: T, private props?: { onSubmit: (data: Dto) => void }) {
        for (const f in this.data) {
            this.fields.set(f as any, new MobXFormField(this.data, f as any));
        }
    }

    get $() {
        const rv: MobXForm.FieldData<Dto> = {} as any;
        Array.from(this.fields).map(([key, field]) => {
            rv[key] = field as any;
        });
        return rv;
    }

    readonly handleSubmit = () => {
        for (const fName in this.data) {
            const f = this.fields.get(fName as any);
            f?.setHelperText();
            f?.setError();
            this.data[fName] = toJS(f?.value);
        }
        const errors = validateSync(plainToClass(this.Dto, this.data, { enableImplicitConversion: true }));
        if (errors.length) {
            console.error('handleSubmit', { errors, data: toJS(this.data) });
            errors.forEach(error => {
                const f = this.fields.get(error.property as any);
                f?.setError(true);
                f?.setHelperText('error message');
            });
            return;
        } else {
            console.info('handleSubmit', { errors, data: toJS(this.data) });
            this.props?.onSubmit(this.data);
        }
    };
}

export namespace MobXForm {
    export type FieldData<T = {}> = {
        [P in keyof T]-?: InputProps<T[P]>;
    };
    export interface InputProps<T = any> {
        readonly name: string;
        readonly label: string;
        readonly value: T;
        readonly error: boolean;
        readonly helperText: string;
        readonly onChange: (value: T) => void;
    }
}
