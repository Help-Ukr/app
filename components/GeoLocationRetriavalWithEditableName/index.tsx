import DoneIcon from '@mui/icons-material/DoneOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import { IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import MapWithLocationSearch, { LocationSelectValue } from '../MapWithLocationSearch';

export type { LocationSelectValue } from '../MapWithLocationSearch';

interface Props {
    location?: LocationSelectValue;
    /**
     * If false, only latitude and longitude
     * can be edited. Defaults to true.
     */
    withName?: boolean;
    onChange: (newValue: LocationSelectValue) => void;
}

const GeoLocationRetriavalWithEditableName = ({ location, onChange, withName = true }: Props) => {
    const [status, setStatus] = useState<'show_map' | 'show_form'>(location ? 'show_form' : 'show_map');

    return (
        <Box
            component="fieldset"
            sx={{
                position: 'relative',
                border: 'none',
                borderRadius: 1,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Typography variant="body1" id="product-tour-set-location">
                    Location
                </Typography>
                <div>
                    {status === 'show_form' && (
                        <IconButton color="secondary" sx={{ ml: 2 }} onClick={() => setStatus('show_map')}>
                            <EditIcon />
                        </IconButton>
                    )}
                    {status === 'show_map' && (
                        <IconButton color="success" sx={{ ml: 2 }} onClick={() => setStatus('show_form')}>
                            <DoneIcon />
                        </IconButton>
                    )}
                </div>
            </Box>
            {status === 'show_map' && (
                <Box sx={{ mt: 1 }}>
                    <MapWithLocationSearch onLocationSelected={onChange} />
                </Box>
            )}
            {status === 'show_form' && (
                <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
                    {withName && (
                        <TextField
                            name="place-name"
                            id="place-name"
                            label="Display name"
                            value={location?.label ?? ''}
                            onChange={e => {
                                if (!location) return;
                                const newPlaceName = e.target.value;
                                onChange({
                                    ...location,
                                    label: newPlaceName,
                                });
                            }}
                        />
                    )}
                    <TextField
                        type="text"
                        name="latitude"
                        id="latitude"
                        label="Latitude"
                        disabled
                        value={location?.value.lat ?? ''}
                    />
                    <TextField
                        type="text"
                        name="longitude"
                        id="longitude"
                        placeholder="Longitude"
                        disabled
                        value={location?.value.lon ?? ''}
                    />
                </Box>
            )}
        </Box>
    );
};

export default GeoLocationRetriavalWithEditableName;
