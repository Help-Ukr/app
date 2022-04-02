import { Paper, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import CollectionPointHeader from './CollectionPointHeader';
import EditGeneralCollectionPointData from './EditGeneralCollectionPointData';
import ManageItems from './ManageItems';

type Props = {};

type CollectionPointTab = 'general' | 'available-items' | 'needed-items';

const ManageCollectionPoint = (props: Props) => {
    const [activeTab, setActiveTab] = useState<CollectionPointTab>('general');

    return (
        <Paper sx={{ minHeight: '100vh' }}>
            <CollectionPointHeader
                orgName="Space Meduza"
                bgImg="https://unsplash.com/photos/pNIgH0y3upM/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ2NDY3OTkw&force=true&w=1920"
            />
            <Tabs
                value={activeTab}
                onChange={(_, newVal) => {
                    setActiveTab(newVal as CollectionPointTab);
                }}
                aria-label="basic tabs example"
                textColor="secondary"
                indicatorColor="secondary"
                variant="fullWidth"
            >
                <Tab value="general" label="General" />
                <Tab value="needed-items" label="Needed Items" />
            </Tabs>

            {activeTab === 'general' && <EditGeneralCollectionPointData />}
            {activeTab === 'needed-items' && (
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
            )}
        </Paper>
    );
};

export default ManageCollectionPoint;
