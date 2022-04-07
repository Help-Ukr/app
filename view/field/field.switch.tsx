import { FormControlLabel, Switch, SwitchProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { MobXForm } from '~/lib/form';
import { useTrAny } from '~/texts';

export const FieldSwitch: FC<{ formField: MobXForm.InputProps<boolean>; switchProps?: SwitchProps }> = observer(
    ({ formField, switchProps }) => {
        const [tr] = useTrAny('form');
        return (
            <FormControlLabel
                sx={{ justifyContent: 'space-between' }}
                labelPlacement="start"
                label={tr(formField.label)}
                control={
                    <Switch
                        color="secondary"
                        checked={formField.value}
                        onChange={e => formField.onChange(e.target.checked)}
                        {...switchProps}
                    />
                }
            />
        );
    },
);
