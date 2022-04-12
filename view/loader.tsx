import { CircularProgress, Modal, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

export type LoaderProps = { loading: boolean; backdropTimeout?: number };
export const Loader: FC<LoaderProps> = observer(({ loading, backdropTimeout }) => {
    const theme = useTheme();
    const [backgroundColor, setBackgroundColor] = useState<string>('unset');
    const timeOut = useRef<any>();

    const backgroundColorUnset = useCallback(() => {
        clearTimeout(timeOut.current);
        setBackgroundColor('unset');
    }, []);

    useEffect(() => {
        if (!loading) {
            backgroundColorUnset();
        }
        timeOut.current = setTimeout(() => setBackgroundColor(theme.palette.background.paper), backdropTimeout ?? 200);
        return backgroundColorUnset;
    }, [backdropTimeout, backgroundColorUnset, loading, theme]);

    return (
        <Modal
            open={loading}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            BackdropProps={{ style: { backgroundColor, opacity: 0.2 } }}
        >
            <CircularProgress sx={{ outline: 'none' }} />
        </Modal>
    );
});
