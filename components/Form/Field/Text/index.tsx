import { TextField, TextFieldProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { MobXForm } from '~/lib/form';

export const FormFieldText: FC<{ formField: MobXForm.InputProps } & TextFieldProps> = observer(
    ({ formField, ...props }) => {
        return <TextField fullWidth {...formField} onChange={e => formField.onChange(e.target.value)} {...props} />;
    },
);
