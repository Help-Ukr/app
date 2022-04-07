import { FormFieldLocation } from '@cmts/Form/Field/Location';
import { FormFieldText } from '@cmts/Form/Field/Text';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import { Button, Container, InputAdornment } from '@mui/material';
import { Box } from '@mui/system';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { FormFieldImage } from '~/components/Form/Field/Image';
import { CollectinPointDto } from '~/dto/dto.collectionpoint';
import { MobXForm } from '~/lib/form';
import { useTr } from '~/texts';

const EditGeneralCollectionPointData = observer(() => {
    const form = useMemo(
        () =>
            new MobXForm(CollectinPointDto, {
                onSubmit: data => {
                    console.log('onSubmit', data);
                },
            }),
        [],
    );
    const [tr] = useTr('form');
    return (
        <Container maxWidth="md">
            <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormFieldLocation formField={form.$.location} />
                <FormFieldText formField={form.$.orgName} />
                <FormFieldText formField={form.$.phone} type="number" />
                <FormFieldText
                    formField={form.$.telegram}
                    InputProps={{ startAdornment: <InputAdornment position="start">@</InputAdornment> }}
                />
                <Box mr={2} sx={{ width: '100%', height: 125 }}>
                    <FormFieldImage formField={form.$.image as any} />
                </Box>
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
