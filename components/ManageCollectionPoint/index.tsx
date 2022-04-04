import { Box, Paper, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useTr } from '~/texts';
import CollectionPointHeader from './CollectionPointHeader';
import EditGeneralCollectionPointData from './EditGeneralCollectionPointData';
import ManageItems from './ManageItems';

type Props = {};

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
            {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
        </div>
    );
}

const ManageCollectionPoint = (props: Props) => {
    const [tr] = useTr('collect');
    const [value, setValue] = useState(0);
    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Paper sx={{ minHeight: '100vh' }}>
            <CollectionPointHeader
                orgName="Space Meduza"
                bgImg="https://unsplash.com/photos/pNIgH0y3upM/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ2NDY3OTkw&force=true&w=1920"
            />
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                variant="fullWidth"
            >
                <Tab value={0} label={tr('tabGeneral')} />
                <Tab value={1} label={tr('tabItems')} />
            </Tabs>
            <TabPanel index={0} value={value}>
                <EditGeneralCollectionPointData />
            </TabPanel>
            <TabPanel index={1} value={value}>
                <ManageItems
                    initialItemQuantity={0}
                    initialData={[
                        {
                            itemCategoryId: '2',
                            quantity: 0,
                        },
                        {
                            itemCategoryId: '4',
                            quantity: 0,
                        },
                        {
                            itemCategoryId: '6',
                            quantity: 5,
                        },
                    ]}
                />
            </TabPanel>
        </Paper>
    );
};

export default ManageCollectionPoint;
