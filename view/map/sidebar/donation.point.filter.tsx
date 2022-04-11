import IconReset from '@mui/icons-material/Close';
import IconFilter from '@mui/icons-material/FilterAlt';
import { CircularProgress, IconButton, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { app } from '~/services/app';
import { DontationPointsService } from '~/services/donationpoints.service';

export const DonationPointSearch = observer(() => {
    const ptsvc = app.get(DontationPointsService);

    return (
        <TextField
            fullWidth
            onChange={ptsvc.setFilter}
            value={ptsvc.filter}
            placeholder="Find donation point"
            InputProps={{
                startAdornment:
                    ptsvc.loading || ptsvc.error ? (
                        <CircularProgress sx={{ mr: 2 }} size={32} color="secondary" />
                    ) : (
                        <IconButton>
                            <IconFilter color="secondary" />
                        </IconButton>
                    ),
                endAdornment: ptsvc.filter && (
                    <IconButton onClick={() => ptsvc.setFilter('')}>
                        <IconReset color="secondary" />
                    </IconButton>
                ),
            }}
        />
    );
});
