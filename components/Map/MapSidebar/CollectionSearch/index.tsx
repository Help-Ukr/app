import PinIcon from '@mui/icons-material/GpsFixedOutlined';
import { IconButton, TextField } from '@mui/material';

const CollectionSearch = () => {
    return (
        <TextField
            fullWidth
            placeholder="Search location..."
            InputProps={{
                startAdornment: (
                    <IconButton>
                        <PinIcon color="secondary" />
                    </IconButton>
                ),
            }}
        />
    );
};

export default CollectionSearch;
