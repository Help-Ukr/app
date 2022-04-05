import { Autocomplete, TextField, TextFieldProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { SearchLocationModel } from '~/model/searchlocation.model';

const FieldLocationSearch: FC<{ locationModel: SearchLocationModel; fieldProps: TextFieldProps }> = observer(
    ({ locationModel, fieldProps }) => {
        return (
            <Autocomplete
                options={locationModel.locationList}
                filterOptions={x => x}
                isOptionEqualToValue={(o, v) => o.osm_id === v.osm_id}
                onInputChange={(_, value) => locationModel.search(value)}
                onChange={(_, value) => locationModel.handleChange(value)}
                renderInput={params => <TextField {...params} {...fieldProps} />}
                getOptionLabel={o => o.display_name}
                renderOption={(props, o) => (
                    <li {...props} key={o.osm_id}>
                        {o.display_name}
                    </li>
                )}
            ></Autocomplete>
        );
    },
);

export default FieldLocationSearch;
