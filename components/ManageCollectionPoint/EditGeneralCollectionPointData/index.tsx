import { FormFieldLocation } from '@cmts/Form/Field/Location';
import { FormFieldText } from '@cmts/Form/Field/Text';
import UploadIcon from '@mui/icons-material/AddAPhoto';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import { Button, Container, IconButton, InputAdornment, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useMemo } from 'react';
import { CollectinPointDto } from '~/dto/dto.collectionpoint';
import { MobXForm } from '~/lib/form';

const EditGeneralCollectionPointData = () => {
    const form = useMemo(() => new MobXForm(CollectinPointDto), []);

    return (
        <Container maxWidth="md">
            <form>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
