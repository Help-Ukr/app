import { Box, Paper, Tab, Tabs } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { CollectinPointDto } from '~/dto/dto.collectionpoint';
import { MobXForm } from '~/lib/form';
import { app } from '~/services/app';
import { ColletionPointsService } from '~/services/collectionpoints.service';
import { useTr } from '~/texts';
import { PointGeneral } from './point.general';
import PointHeader from './point.header';
import { PointItems } from './point.items';

export type CollectinPointForm = { form: MobXForm<typeof CollectinPointDto> };

export const PointManage = observer(() => {
    const [tr] = useTr('collect');
    const [tabIdx, setTabIdx] = useState(0);
    const handleChange = (_: any, newValue: number) => setTabIdx(newValue);
    const cpsSvc = app.get(ColletionPointsService);
    const form = cpsSvc.useForm(cpsSvc.point);
    cpsSvc.use();

    return (
        <Paper>
            <PointHeader title={cpsSvc.point?.name} bgImg={cpsSvc.point?.image} />
            <Tabs
                value={tabIdx}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                variant="fullWidth"
            >
                <Tab value={0} label={tr('tabGeneral')} />
                <Tab value={1} label={tr('tabItems')} />
            </Tabs>
            <TabPanel index={0} value={tabIdx}>
                <PointGeneral form={form} />
            </TabPanel>
            <TabPanel index={1} value={tabIdx}>
                <PointItems form={form} />
            </TabPanel>
        </Paper>
    );
});

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}
