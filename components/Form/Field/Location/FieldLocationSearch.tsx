import { Autocomplete, TextField, TextFieldProps } from '@mui/material';
import nominatim from 'nominatim-client';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { FieldLocationValue } from '.';

const FieldLocationSearch: FC<{
    onChange: (value: FieldLocationValue) => void;
    fieldProps?: TextFieldProps;
}> = ({ onChange, fieldProps }) => {
    const client = useMemo(() => nominatim.createClient({ useragent: 'HelpUkr', referer: 'https://help-ukr.org' }), []);
    const [value, setValue] = useState<nominatim.SearchResultItem | null>();
    const [timemOut, setTimeOut] = useState(0);
    const [results, setResult] = useState<nominatim.SearchResultItem[]>([]);

    useEffect(() => {
        if (value) {
            onChange({ address: value.display_name, lat: +value.lat, lng: +value.lon });
        }
    }, [onChange, value]);

    const handleChange = useCallback(
        (_, query: string) => {
            if (timemOut) clearTimeout(timemOut);
            setTimeOut(
                setTimeout(async () => {
                    const rv = await client.search({ q: query });
                    console.log(rv);
                    setResult(rv.map((item, id) => ({ ...item, id })));
                }, 500) as any,
            );
            return () => clearTimeout(timemOut);
        },
        [client, timemOut],
    );

    return (
        <Autocomplete
            options={results}
            filterOptions={x => x}
            isOptionEqualToValue={(o, v) => o.osm_id === v.osm_id}
            onInputChange={handleChange}
            onChange={(_, value) => setValue(value)}
            renderInput={params => <TextField {...params} {...fieldProps} />}
            getOptionLabel={o => o.display_name}
            renderOption={(props, o) => (
                <li {...props} key={o.osm_id}>
                    {o.display_name}
                </li>
            )}
        ></Autocomplete>
    );
};

export default FieldLocationSearch;
