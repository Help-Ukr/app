import MapIcon from '@mui/icons-material/MapRounded';
import {
    Autocomplete,
    AutocompleteRenderInputParams,
    IconButton,
    TextField,
    TextFieldProps,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import { FC, HTMLAttributes, useCallback, useEffect, useState } from 'react';
import { MobXForm } from '~/lib/form';
import { SearchLocation, SearchLocationModel } from '~/model/searchlocation.model';
import { useTr, validationTr } from '~/texts';

const FieldLocationMap = dynamic(() => import('./FieldLocationMap'), { ssr: false });

export type FieldLocationValue = { address: string; lat: number; lng: number };
export const FormFieldLocation: FC<{ formField: MobXForm.InputProps<FieldLocationValue> } & TextFieldProps> = observer(
    ({ formField, ...props }) => {
        const [tr] = useTr('form');
        const locationModel = SearchLocationModel.useModel();
        const [showMap, setShowMap] = useState(false);

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
                    helperText={validationTr(
                        tr,
                        formField.validation?.children?.find(err => err.property === 'address'),
                    )}
                    error={formField.error}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <IconButton onClick={() => setShowMap(!showMap)}>
                                <MapIcon />
                            </IconButton>
                        ),
                    }}
                    {...props}
                />
            ),
            [tr, formField.label, formField.validation?.children, formField.error, props, showMap],
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
                    noOptionsText={tr('noOptions')}
                />
                <Box py={1}>
                    <Typography textAlign="center" variant="caption" component="p" sx={{ fontStyle: 'italic' }}>
                        {tr('infoLatLng', { lat: locationModel.position.lat, lon: locationModel.position.lng })}
                    </Typography>
                </Box>
                {showMap && <FieldLocationMap locationModel={locationModel} />}
            </Box>
        );
    },
);
