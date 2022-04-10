import Log from '@uk/log';
import { plainToClass } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';
import { action, makeObservable, observable, toJS } from 'mobx';
import { O } from 'ts-toolbelt';

type DtoClass = new (...args: any[]) => any;
export class MobXFormField<T extends DtoClass> {
    constructor(private dto: T, public name: keyof T) {
        this.value = dto[name];
        makeObservable(this);
    }

    readonly label = this.name;
    readonly dtoname = this.dto.constructor.name;

    @observable readonly value: any = undefined;
    @observable readonly validation?: ValidationError;
    @observable readonly error: boolean = false;

    @action onChange = (value: any) => {
        this.self.value = value;
        if (this.error) {
            this.setValidation();
        }
    };

    @action setValidation = (err: ValidationError | undefined = undefined) => {
        this.self.validation = err;
        this.self.error = !!err;
    };

    private get self(): O.Writable<this> {
        return this as any;
    }
}

export class MobXForm<T extends DtoClass, Dto = InstanceType<T>> {
    protected readonly fields = new Map<keyof Dto, MobXFormField<T>>();
    protected readonly data = plainToClass(this.Dto, this.props?.initialData || {}, { enableImplicitConversion: true });
    protected log = new Log('FORM');

    constructor(
        protected Dto: T,
        private props?: {
            initialData?: O.Partial<InstanceType<T>, 'deep'>;
            onSubmit?: (data: Dto) => void;
        },
    ) {
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
        return this.log.try('handleSubmit', p => {
            for (const fName in this.data) {
                const f = this.fields.get(fName as any);
                f?.setValidation();
                this.data[fName] = f?.value;
            }
            p.finally({ data: toJS(this.data) });
            const errors = validateSync(plainToClass(this.Dto, this.data, { enableImplicitConversion: true }));
            p.finally({ errors });
            if (errors.length) {
                errors.forEach(error => {
                    const f = this.fields.get(error.property as any);
                    f?.setValidation(error);
                });
                return;
            } else {
                this.props?.onSubmit?.(this.data);
            }
        });
    };
}

export namespace MobXForm {
    export type FieldData<T extends InstanceType<DtoClass>> = {
        [P in keyof T]-?: InputProps<T[P]>;
    };
    export interface InputProps<T = any> {
        readonly name: string;
        readonly dtoname: string;
        readonly label: string;
        readonly error: boolean;
        readonly value: T;
        readonly validation?: ValidationError;
        readonly onChange: (value: T) => void;
    }
}
