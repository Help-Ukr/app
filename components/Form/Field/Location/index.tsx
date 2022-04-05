import { Autocomplete, AutocompleteRenderInputParams, TextField, TextFieldProps, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import { FC, HTMLAttributes, useCallback, useEffect } from 'react';
import { MobXForm } from '~/lib/form';
import { SearchLocation, SearchLocationModel } from '~/model/searchlocation.model';
import { useTr } from '~/texts';

const FieldLocationMap = dynamic(() => import('./FieldLocationMap'), { ssr: false });

export type FieldLocationValue = { address: string; lat: number; lng: number };
export const FormFieldLocation: FC<{ formField: MobXForm.InputProps<FieldLocationValue> } & TextFieldProps> = observer(
    ({ formField, ...props }) => {
        const [tr] = useTr('dto');
        const locationModel = SearchLocationModel.useModel();

        useEffect(() => {
            if (locationModel.location) {
                const { display_name, lat, lng } = locationModel.location;
                formField.onChange?.({ address: display_name, lat, lng });
            } else {
                formField.onChange?.({ address: '', lat: 0, lng: 0 });
            }
        }, [formField, locationModel.defaultMapLocation, locationModel.location]);

        const renderInput = useCallback(
            (params: AutocompleteRenderInputParams) => (
                <TextField
                    {...params}
                    label={tr(formField.label as any)}
                    helperText={formField.helperText}
                    error={formField.error}
                    {...props}
                />
            ),
            [formField.error, formField.helperText, formField.label, props, tr],
        );

        const renderOption = useCallback(
            (props: HTMLAttributes<HTMLLIElement>, o: SearchLocation) => (
                <li {...props} key={o.osm_id}>
                    {o.display_name}
                </li>
            ),
            [],
        );

        return (
            <Box>
                <Autocomplete
                    options={locationModel.locationList}
                    filterOptions={x => x}
                    isOptionEqualToValue={(o, v) => o.osm_id === v.osm_id}
                    onInputChange={(_, value) => locationModel.search(value)}
                    onChange={(_, value) => locationModel.handleChange(value)}
                    value={locationModel.location || null}
                    getOptionLabel={o => o.display_name}
                    renderInput={renderInput}
                    renderOption={renderOption}
                    noOptionsText={tr('NoOptions')}
                />
                <Box py={1}>
                    <Typography textAlign="center" variant="caption" component="p" sx={{ fontStyle: 'italic' }}>
                        {tr('LatLng', { lat: locationModel.position.lat, lon: locationModel.position.lng })}
                    </Typography>
                </Box>
                <FieldLocationMap locationModel={locationModel} />
            </Box>
        );
    },
);
