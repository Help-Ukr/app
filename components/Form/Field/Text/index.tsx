import { TextField, TextFieldProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { MobXForm } from '~/lib/form';
import { Tr } from '~/lib/tr';
import { useTr } from '~/texts';

export const FormFieldText: FC<{ formField: MobXForm.InputProps } & TextFieldProps> = observer(
    ({ formField, ...props }) => {
        const [tr] = useTr('form');
        return (
            <TextField
                fullWidth
                {...formField}
                label={tr(formField.label as any)}
                helperText={Tr.validationTr(tr, formField.validation)}
                onChange={e => formField.onChange(e.target.value)}
                {...props}
            />
        );
    },
);
