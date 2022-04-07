import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
    Collapse,
    Container,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Switch
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { app } from '~/services/app';
import { CollectItem, CollectItemsService } from '~/services/collectitems.service';
import { CollectinPointForm } from '~/view/point/point.manage';
import { PointGeneralFormSave } from './point.general';

export const PointItems: FC<CollectinPointForm> = observer(({ form }) => {
    const cisSvc = app.get(CollectItemsService);
    cisSvc.use();
    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <List>
                {cisSvc.items.map(item => (
                    <RenderListItem key={item.id} item={item} cisSvc={cisSvc} />
                ))}
            </List>
            <PointGeneralFormSave form={form} />
        </Container>
    );
});

const RenderListItem: FC<{ item: CollectItem; cisSvc: Readonly<CollectItemsService> }> = observer(
    ({ item, cisSvc }) => {
        const { items } = item;
        const open = cisSvc.openId === item.id;
        const isCollapsed: boolean = !!items?.length;
        return (
            <>
                <ListItem button onClick={() => isCollapsed && cisSvc.handleOpen(open ? undefined : item.id)}>
                    <ListItemAvatar>{item.icon}</ListItemAvatar>
                    {isCollapsed && (open ? <ExpandLess /> : <ExpandMore />)}
                    <ListItemText primary={item.name} />
                    <ListItemSecondaryAction>
                        <Switch color="secondary" />
                    </ListItemSecondaryAction>
                </ListItem>
                {isCollapsed && (
                    <Collapse in={open} unmountOnExit sx={{ ml: 4 }}>
                        {items?.map(cItem => (
                            <List key={cItem.id} component="div" disablePadding>
                                <RenderListItem item={cItem} cisSvc={cisSvc} />
                            </List>
                        ))}
                    </Collapse>
                )}
            </>
        );
    },
);
