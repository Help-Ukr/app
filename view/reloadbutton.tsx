import { Button } from '@mui/material';
import { useTr } from '~/texts';

export const ReloadButton = () => {
    const [tr] = useTr('app');
    return (
        <Button color="inherit" size="small" onClick={() => window.location.reload()}>
            {tr('reload')}
        </Button>
    );
};
