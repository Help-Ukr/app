import SaveIcon from '@mui/icons-material/SaveOutlined';
import { Button, Container, InputAdornment } from '@mui/material';
import { Box } from '@mui/system';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { CollectinPointDto } from '~/dto/dto.collectionpoint';
import { MobXForm } from '~/lib/form';
import { useTr } from '~/texts';
import { FieldImage } from '~/view/field/field.image';
import { FieldSwitch } from '~/view/field/field.switch';
import { FieldText } from '~/view/field/field.text';
import { FieldLocation } from '~/view/field/location/field.location';

const EditGeneralCollectionPointData = observer(() => {
    const [tr] = useTr('form');
    const form = useMemo(
        () =>
            new MobXForm(CollectinPointDto, {
                onSubmit: data => {
                    console.log('onSubmit', data);
                },
            }),
        [],
    );
    return (
        <Container maxWidth="md">
            <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FieldText formField={form.$.orgName} />
                <FieldLocation formField={form.$.location} />
                <FieldText formField={form.$.phone} type="number" />
                <FieldText
                    formField={form.$.telegram}
                    InputProps={{ startAdornment: <InputAdornment position="start">@</InputAdornment> }}
                />
                <Box mr={2} sx={{ width: '100%', height: 125 }}>
                    <FieldImage formField={form.$.image} />
                </Box>
                <FieldSwitch formField={form.$.enabled} />
                <Button
                    sx={{ mb: 4, position: 'fixed', right: 20, bottom: 20 }}
                    color="secondary"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={form.handleSubmit}
                >
                    {tr('save')}
                </Button>
            </Box>
        </Container>
    );
});

export default EditGeneralCollectionPointData;
