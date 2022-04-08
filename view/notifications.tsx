import { Alert, Snackbar } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { app } from '~/services/app';
import { NotificationService } from '~/services/notification.service';

export const Notifications = observer(() => {
    const { notification } = app.get(NotificationService);
    const { severity, message, button: Button, ...rest } = notification ?? {};

    return (
        <>
            {notification && (
                <Snackbar anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }} open={true} {...rest}>
                    <Alert action={Button && <Button />} severity={severity}>
                        {message}
                    </Alert>
                </Snackbar>
            )}
        </>
    );
});
