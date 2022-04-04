import { TextFieldProps, Typography } from '@mui/material';
import { Box } from '@mui/system';
import 'leaflet-geosearch/dist/geosearch.css';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { MobXForm } from '~/lib/form';
const FieldLocationMap = dynamic(() => import('./FieldLocationMap'), { ssr: false });

export const FormFieldLocation: FC<
    { formField: MobXForm.InputProps<{ address: string; lat?: number; lng?: number }> } & TextFieldProps
> = observer(({ formField, ...props }) => {
    const { address, lat, lng } = formField.value;
    return (
        <Box>
            <FieldLocationMap {...formField} onChange={data => formField.onChange(data)} />
            <Box py={2}>
                <Typography textAlign="center" variant="body2" sx={{ fontStyle: 'italic' }}>
                    {`(Lat: ${lat}, Lng: ${lng})`}
                </Typography>
            </Box>
        </Box>
    );
});
