import MapIcon from '@mui/icons-material/MapRounded';
import { Autocomplete, AutocompleteRenderInputParams, IconButton, TextField, TextFieldProps } from '@mui/material';
import { Box } from '@mui/system';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import { FC, HTMLAttributes, useCallback, useEffect, useState } from 'react';
import { MobXForm } from '~/lib/form';
import { Tr } from '~/lib/tr';
import { app } from '~/services/app';
import { SearchLocation, SearchLocationService } from '~/services/searchlocation.service';
import { useTr, useTrAny } from '~/texts';

const FieldLocationMap = dynamic(() => import('./field.location.map'), { ssr: false });

export type FieldLocationValue = { address: string; latitude: number; longitude: number };
export const FieldLocation: FC<{ formField: MobXForm.InputProps<FieldLocationValue> } & TextFieldProps> = observer(
    ({ formField, ...props }) => {
        const [tr] = useTrAny(formField.dtoname);
        const [trForm] = useTr('form');
        const locationSvc = app.get(SearchLocationService);
        const [showMap, setShowMap] = useState(false);

        locationSvc.use();

        useEffect(() => {
            if (!locationSvc.location && formField.value) {
                locationSvc.reverse({ lat: formField.value.latitude, lng: formField.value.longitude });
            }
        }, [formField.value, locationSvc]);

        useEffect(() => {
            if (locationSvc.location) {
                const { display_name, latitude, longitude } = locationSvc.location;
                formField.onChange?.({ address: display_name, latitude, longitude });
            }
        }, [formField, locationSvc.defaultMapLocation, locationSvc.location]);

        const renderInput = useCallback(
            (params: AutocompleteRenderInputParams) => (
                <TextField
                    {...params}
                    label={tr(formField.label)}
                    helperText={Tr.validationTr(
                        trForm,
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
            [tr, formField.label, formField.validation?.children, formField.error, trForm, props, showMap],
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
                    options={locationSvc.locationList}
                    filterOptions={x => x}
                    isOptionEqualToValue={(o, v) => o.osm_id === v.osm_id}
                    onInputChange={(_, value) => locationSvc.search(value)}
                    onChange={(_, value) => locationSvc.handleChange(value)}
                    value={locationSvc.location || null}
                    getOptionLabel={o => o.display_name}
                    renderInput={renderInput}
                    renderOption={renderOption}
                    noOptionsText={trForm('noOptions')}
                />
                {showMap && <FieldLocationMap locationSvc={locationSvc} />}
            </Box>
        );
    },
);
