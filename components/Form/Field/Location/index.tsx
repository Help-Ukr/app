import { TextFieldProps, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { MobXForm } from '~/lib/form';
import { useTr } from '~/texts';

const FieldLocationMap = dynamic(() => import('./FieldLocationMap'), { ssr: false });
const FieldLocationSearch = dynamic(() => import('./FieldLocationSearch'), { ssr: false });

export type FieldLocationValue = { address: string; lat: number; lng: number };
export const FormFieldLocation: FC<{ formField: MobXForm.InputProps<FieldLocationValue> } & TextFieldProps> = observer(
    ({ formField, ...props }) => {
        const { address, lat, lng } = formField.value;
        const [tr] = useTr('dto');

        return (
            <Box>
                <FieldLocationSearch
                    onChange={formField.onChange}
                    fieldProps={{ ...props, label: tr(formField.label as any) }}
                />
                <FieldLocationMap onChange={formField.onChange} value={formField.value} />
                <Box py={2}>
                    <Typography textAlign="center" variant="body2" sx={{ fontStyle: 'italic' }}>
                        {`(Lat: ${lat}, Lng: ${lng})`}
                    </Typography>
                </Box>
            </Box>
        );
    },
);
