import { FormFieldLocation } from '@cmts/Form/Field/Location';
import { FormFieldText } from '@cmts/Form/Field/Text';
import type { LocationSelectValue } from '@cmts/GeoLocationRetriavalWithEditableName';
import UploadIcon from '@mui/icons-material/AddAPhoto';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import { Button, Container, IconButton, InputAdornment, Typography } from '@mui/material';
import { Box } from '@mui/system';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { CollectinPointDto } from '~/dto/dto.collectionpoint';
import { MobXForm } from '~/lib/form';

const GeoLocationRetrievalWithEditableName = dynamic(() => import('@cmts/GeoLocationRetriavalWithEditableName'), {
    ssr: false,
});

type Props = {};

const EditGeneralCollectionPointData = (props: Props) => {
    const form = useMemo(() => new MobXForm(CollectinPointDto), []);

    const [location, setLocation] = useState<LocationSelectValue>({
        label: 'Skalitzer Straße 80',
        value: {
            lat: 52.5007117,
            lon: 13.4392206,
        },
    });

    return (
        <Container maxWidth="md">
            <form>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <GeoLocationRetrievalWithEditableName location={location} onChange={setLocation} />
                    <FormFieldLocation formField={form.$.location} />
                    <FormFieldText formField={form.$.orgName} />
                    <FormFieldText formField={form.$.phone} type="number" />
                    <FormFieldText
                        formField={form.$.telegram}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">@</InputAdornment>,
                        }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <label htmlFor="icon-button-file">
                            <input style={{ display: 'none' }} accept="image/*" id="icon-button-file" type="file" />
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <UploadIcon />
                            </IconButton>
                        </label>
                        <Typography sx={{ opacity: 0.5 }}>Change image</Typography>
                    </Box>
                    <Button
                        sx={{ mb: 4 }}
                        color="secondary"
                        variant="outlined"
                        startIcon={<SaveIcon />}
                        onClick={form.handleSubmit}
                    >
                        Save
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default EditGeneralCollectionPointData;
