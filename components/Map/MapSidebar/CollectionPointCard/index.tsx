import { Card, CardContent, CardMedia, SxProps, Typography } from '@mui/material';
import React from 'react';
import { CollectionPoint, ITEM_CATEGORIES } from '~/api-client';

type Props = {
    collectionPoint: CollectionPoint;
};

const sxCard: SxProps = {
    flex: '1 0 auto',
    padding: { xs: 1, md: 2 },
    ':last-child': { paddingBottom: { xs: 1, md: 2 } },
};

const CollectionPointCard = ({ collectionPoint }: Props) => {
    const items = collectionPoint.neededItems;

    return (
        <Card sx={{ display: 'flex', width: '100%' }} elevation={3}>
            <CardMedia
                component="img"
                sx={{ width: { xs: 80, md: 120 } }}
                image={collectionPoint.coverImg}
                alt={`Donations from ${collectionPoint.displayName}`}
            />
            <CardContent sx={sxCard}>
                <Typography variant="subtitle1">{collectionPoint.displayName}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {collectionPoint.location.address}
                </Typography>
                <Typography sx={{ mt: 1 }} variant="subtitle2">
                    {items.map(item => {
                        const foundItem = ITEM_CATEGORIES.find(category => category.id === item.itemCategoryId);
                        return foundItem?.icon ?? '';
                    })}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CollectionPointCard;
