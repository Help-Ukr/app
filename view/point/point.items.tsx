import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
    Collapse,
    Container,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Switch,
} from '@mui/material';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { FC, useCallback } from 'react';
import { app } from '~/services/app';
import { CollectItem, CollectItemsService } from '~/services/collectitems.service';
import { CollectinPointForm } from '~/view/point/point.manage';
import { PointGeneralFormSave } from './point.general';

export const PointItems: FC<CollectinPointForm> = observer(({ form }) => {
    const cisSvc = app.get(CollectItemsService);
    cisSvc.use();
    return (
        <Container maxWidth="md" sx={{ mt: 4, pb: 4, pr: 0, pl: 0 }}>
            <List>
                {cisSvc.items.map(item => (
                    <RenderListItem key={item.id} item={item} cisSvc={cisSvc} form={form} />
                ))}
            </List>
            <PointGeneralFormSave form={form} />
        </Container>
    );
});

const RenderListItem: FC<CollectinPointForm & { item: CollectItem; cisSvc: Readonly<CollectItemsService> }> = observer(
    ({ item, cisSvc, form }) => {
        const { items } = item;
        const open = cisSvc.openId === item.id;
        const isCollapsed: boolean = !!items?.length;
        const values = toJS(form.$.needed_items.value);
        const idx = values.findIndex(v => v.item_category_id === item.id);
        const handleChange = useCallback(
            (_, checked: boolean) => {
                if (checked && idx < 0) values.push({ item_category_id: item.id });
                else if (idx >= 0) values.splice(idx, 1);
                form.$.needed_items.onChange(values);
            },
            [form.$.needed_items, idx, item.id, values],
        );
        return (
            <>
                <ListItem button onClick={() => isCollapsed && cisSvc.handleOpen(open ? undefined : item.id)}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                        {isCollapsed && (open ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemIcon>
                    <ListItemAvatar sx={{ minWidth: 28 }}>{item.icon}</ListItemAvatar>
                    <ListItemText primary={item.name} />
                    <ListItemSecondaryAction>
                        <Switch color="secondary" onChange={handleChange} checked={idx >= 0} />
                    </ListItemSecondaryAction>
                </ListItem>
                {isCollapsed && (
                    <Collapse in={open} unmountOnExit>
                        {items?.map(cItem => (
                            <List key={cItem.id} component="div" disablePadding>
                                <RenderListItem item={cItem} cisSvc={cisSvc} form={form} />
                            </List>
                        ))}
                    </Collapse>
                )}
            </>
        );
    },
);
