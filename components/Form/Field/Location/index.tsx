import { TextFieldProps, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import { FC, useEffect } from 'react';
import { MobXForm } from '~/lib/form';
import { useSearchLocation } from '~/model/searchlocation.model';
import { useTr } from '~/texts';

const FieldLocationMap = dynamic(() => import('./FieldLocationMap'), { ssr: false });
const FieldLocationSearch = dynamic(() => import('./FieldLocationSearch'), { ssr: false });

export type FieldLocationValue = { address: string; lat: number; lng: number };
export const FormFieldLocation: FC<{ formField: MobXForm.InputProps<FieldLocationValue> } & TextFieldProps> = observer(
    ({ formField, ...props }) => {
        const { address, lat, lng } = formField.value;
        const [tr] = useTr('dto');
        const locationModel = useSearchLocation();

        useEffect(() => {
            if (locationModel.location) {
                const { display_name, lat, lng } = locationModel.location;
                formField.onChange?.({ address: display_name, lat, lng });
            }
        }, [formField, locationModel.location]);

        return (
            <Box>
                <FieldLocationSearch
                    locationModel={locationModel}
                    fieldProps={{ ...props, value: formField.value.address, label: tr(formField.label as any) }}
                />
                <FieldLocationMap locationModel={locationModel} />
                <Box py={2}>
                    <Typography textAlign="center" variant="body2" sx={{ fontStyle: 'italic' }}>
                        {`(Lat: ${lat}, Lng: ${lng})`}
                    </Typography>
                </Box>
            </Box>
        );
    },
);
