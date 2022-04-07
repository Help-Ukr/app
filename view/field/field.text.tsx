import { TextField, TextFieldProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { MobXForm } from '~/lib/form';
import { useTr, validationTr } from '~/texts';

export const FieldText: FC<
    { formField: MobXForm.InputProps<string> | MobXForm.InputProps<string | undefined> } & TextFieldProps
> = observer(({ formField, ...props }) => {
    const [tr] = useTr('form');
    return (
        <TextField
            fullWidth
            {...formField}
            label={tr(formField.label as any)}
            helperText={validationTr(tr, formField.validation)}
            onChange={e => formField.onChange(e.target.value)}
            {...props}
        />
    );
});
