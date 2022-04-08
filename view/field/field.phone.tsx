import { FormHelperText, styled, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { MobXForm } from '~/lib/form';
import { Tr } from '~/lib/tr';
import { useTr, useTrAny } from '~/texts';

const ThemeFieldPhone = styled('div')(({ theme }) => ({
    '.react-tel-input': {
        '.special-label': {
            backgroundColor: theme.palette.background.paper,
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
            color: theme.palette.text.secondary,
            left: theme.spacing(1),
        },
        '.form-control ': {
            width: '100%',
            backgroundColor: 'unset',
            color: theme.palette.text.primary,
            borderColor: theme.palette.grey['700'],
            ':hover': {
                borderColor: theme.palette.text.primary,
            },
            ':focus': {
                borderColor: theme.palette.text.primary,
                boxShadow: `0 0 0 1px ${theme.palette.text.primary}`,
            },
        },
        '.country-list': {
            backgroundColor: theme.palette.background.paper,
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
            '.country.highlight': {
                backgroundColor: theme.palette.background.paper,
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))',
            },
            '.country:hover': {
                backgroundColor: theme.palette.background.paper,
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))',
            },
        },
    },
}));

export const FieldPhone: FC<{ formField: MobXForm.InputProps<string> | MobXForm.InputProps<string | undefined> }> =
    observer(({ formField }) => {
        const [tr] = useTrAny(formField.dtoname);
        const [trForm] = useTr('form');
        const theme = useTheme();

        return (
            <ThemeFieldPhone theme={theme}>
                <PhoneInput
                    country={'de'}
                    regions="europe"
                    preferredCountries={['ua', 'de']}
                    value={formField.value}
                    onChange={formField.onChange}
                    placeholder=""
                    specialLabel={tr(formField.label || '')}
                />
                <FormHelperText error={formField.error}>{Tr.validationTr(trForm, formField.validation)}</FormHelperText>
            </ThemeFieldPhone>
        );
    });
