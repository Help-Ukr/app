import { observer } from 'mobx-react-lite';
import { FC, Fragment } from 'react';
import { Loader } from './loader';

type Call = { loading?: boolean };
export const AsyncView: FC<Call & { call?: Call; calls?: Call[] }> = observer(({ children, ...props }) => {
    const loading = !!props.call?.loading || !!(props.loading ?? props.calls?.find(c => c && c.loading)?.loading);
    console.log({ loading });
    return (
        <Fragment>
            <Loader loading={loading} />
            {children}
        </Fragment>
    );
});
