import { TextField, TextFieldProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { MobXForm } from '~/lib/form';
import { Tr } from '~/lib/tr';
import { useTr, useTrAny } from '~/texts';

export const FieldText: FC<
    { formField: MobXForm.InputProps<string> | MobXForm.InputProps<string | undefined> } & TextFieldProps
> = observer(({ formField, ...props }) => {
    const [tr] = useTrAny(formField.dtoname);
    const [trForm] = useTr('form');
    return (
        <TextField
            fullWidth
            value={formField.value || ''}
            error={formField.error}
            label={tr(formField.label)}
            helperText={Tr.validationTr(trForm, formField.validation)}
            onChange={e => formField.onChange(e.target.value)}
            {...props}
        />
    );
});
