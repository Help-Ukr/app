import InstagramIcon from '@mui/icons-material/Instagram';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import TelegramIcon from '@mui/icons-material/Telegram';
import { Button, Container, InputAdornment } from '@mui/material';
import { Box } from '@mui/system';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { useTr } from '~/texts';
import { FieldImage } from '~/view/field/field.image';
import { FieldSwitch } from '~/view/field/field.switch';
import { FieldText } from '~/view/field/field.text';
import { FieldLocation } from '~/view/field/location/field.location';
import { CollectinPointForm } from '~/view/point/point.manage';

export const PointGeneral: FC<CollectinPointForm> = observer(({ form }) => {
    return (
        <Container maxWidth="md">
            <Box sx={{ pt: 4, pb: 16, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FieldText formField={form.$.name} />
                <FieldLocation formField={form.$.location} />
                <FieldText formField={form.$.phone} type="number" />
                <FieldText
                    formField={form.$.telegram}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <TelegramIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <FieldText
                    formField={form.$.instagram}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <InstagramIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Box mr={2} sx={{ width: '100%', height: 125 }}>
                    <FieldImage formField={form.$.imageFile} />
                </Box>
                <FieldSwitch formField={form.$.enabled} />
            </Box>
            <PointGeneralFormSave form={form} />
        </Container>
    );
});

export const PointGeneralFormSave: FC<CollectinPointForm> = ({ form }) => {
    const [tr] = useTr('form');

    return (
        <Button
            sx={{ mb: 4, position: 'fixed', right: 20, bottom: 20 }}
            color="secondary"
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={form.handleSubmit}
        >
            {tr('save')}
        </Button>
    );
};
