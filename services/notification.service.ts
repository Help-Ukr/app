/* eslint-disable react-hooks/rules-of-hooks */
import { AlertProps, SnackbarProps } from '@mui/material';
import { action, makeObservable, observable, runInAction } from 'mobx';
import { FC } from 'react';
import { O } from 'ts-toolbelt';
import { Service } from 'typedi';

export type Notification = O.Required<SnackbarProps, 'message'> & {
    severity?: AlertProps['severity'];
    button?: FC;
};

@Service()
export class NotificationService {
    @observable.ref
    notification?: Notification;

    constructor() {
        makeObservable(this);
    }

    @action notify(n: Notification) {
        this.notification = {
            ...n,
            onClose: (e, r) => {
                runInAction(() => (this.notification = undefined));
                n.onClose?.(e, r);
            },
        };
    }
}
