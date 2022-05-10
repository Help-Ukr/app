import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import MapIcon from '@mui/icons-material/MapRounded';
import { Autocomplete, AutocompleteRenderInputParams, IconButton, TextField, TextFieldProps } from '@mui/material';
import { Box } from '@mui/system';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import { FC, HTMLAttributes, useCallback, useEffect, useMemo, useState } from 'react';
import { MobXForm } from '~/lib/form';
import { Tr } from '~/lib/tr';
import { app } from '~/services/app';
import { SearchLocation, SearchLocationService } from '~/services/searchlocation.service';
import { useTr, useTrAny } from '~/texts';

const FieldLocationMap = dynamic(() => import('./field.location.map'), { ssr: false });

export type FieldLocationValue = { address: string; latitude: number; longitude: number };
export const FieldLocation: FC<
    { formField: MobXForm.InputProps<FieldLocationValue>; initial?: FieldLocationValue } & TextFieldProps
> = observer(({ formField, initial, ...props }) => {
    const [tr] = useTrAny(formField.dtoname);
    const [trForm] = useTr('form');
    const slSvc = app.get(SearchLocationService);
    const [showMap, setShowMap] = useState(false);

    slSvc.use();

    useEffect(() => {
        if (initial) slSvc.reverse({ lat: initial.latitude, lng: initial.longitude });
    }, [initial, slSvc]);

    useEffect(() => {
        if (slSvc.location) {
            const { latitude, longitude } = slSvc.location;
            formField.onChange?.({
                address: SearchLocationService.displayAddress(slSvc.location),
                latitude,
                longitude,
            });
        }
    }, [formField, slSvc.location]);

    const StartAdornment = useMemo(() => {
        if (slSvc.loading) {
            return (
                <IconButton>
                    <LocationSearchingIcon color="secondary" className="rotate" />
                </IconButton>
            );
        } else {
            return (
                <IconButton onClick={() => setShowMap(!showMap)}>
                    <MapIcon />
                </IconButton>
            );
        }
    }, [slSvc.loading, showMap]);

    const helperText = useMemo(() => {
        if (formField.validation) {
            if (formField.validation.children?.length) {
                return Tr.validationTr(
                    trForm,
                    formField.validation?.children?.find(err => err.property === 'address'),
                );
            } else {
                return Tr.validationTr(trForm, formField.validation);
            }
        }
    }, [formField.validation, trForm]);

    const renderInput = useCallback(
        (params: AutocompleteRenderInputParams) => (
            <TextField
                {...params}
                label={tr(formField.label)}
                helperText={helperText}
                error={formField.error}
                InputProps={{
                    ...params.InputProps,
                    startAdornment: StartAdornment,
                }}
                {...props}
            />
        ),
        [tr, formField.label, formField.error, helperText, StartAdornment, props],
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
                options={slSvc.options}
                filterOptions={x => x}
                isOptionEqualToValue={(o, v) => o.osm_id === v.osm_id}
                onInputChange={(_, value) => slSvc.search(value)}
                onChange={(_, value) => slSvc.handleChange(value)}
                value={slSvc.location || null}
                getOptionLabel={o => SearchLocationService.displayAddress(o)}
                renderInput={renderInput}
                renderOption={renderOption}
                noOptionsText={trForm('noOptions')}
            />
            {showMap && <FieldLocationMap locationSvc={slSvc} />}
        </Box>
    );
});
