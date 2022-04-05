import { TextField, TextFieldProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { MobXForm } from '~/lib/form';
import { useTr, validationTr } from '~/texts';

export const FormFieldText: FC<{ formField: MobXForm.InputProps } & TextFieldProps> = observer(
    ({ formField, ...props }) => {
        const [tr] = useTr('dto');
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
    },
);
