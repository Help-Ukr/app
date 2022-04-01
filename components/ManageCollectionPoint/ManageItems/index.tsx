import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import RemoveIcon from "@mui/icons-material/Remove";
import {
    Card,
    CardActions,
    CardContent,
    Container,
    Fab,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { CollectionPointItem, ITEM_CATEGORIES } from "../../../api-client";
import AddCategoriesDialog from "../AddCategoriesDialog";

type Props = {
    initialData: CollectionPointItem[];
    initialItemQuantity?: number;
};

const ManageItems = ({ initialData, initialItemQuantity = 1 }: Props) => {
    const [showAddCategoryDialog, setShowAddCategoryDialog] =
        useState<boolean>(false);

    const [availableItems, setAvailableItems] =
        useState<CollectionPointItem[]>(initialData);

    function onRemove(index: number) {
        const newAvailableItems = [...availableItems];
        newAvailableItems.splice(index, 1);
        setAvailableItems(newAvailableItems);
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Grid container spacing={3}>
                {availableItems.map((availableItem, idx) => {
                    const itemCategory = ITEM_CATEGORIES.find(
                        (itemCategory) =>
                            itemCategory.id === availableItem.itemCategoryId
                    );
                    return (
                        <Grid
                            key={availableItem.itemCategoryId}
                            item
                            xs={6}
                            md={4}
                        >
                            <Card>
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        {itemCategory!.icon}{" "}
                                        {itemCategory!.displayName}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <IconButton color="primary">
                                        <AddIcon />
                                    </IconButton>
                                    <IconButton color="primary">
                                        <RemoveIcon />
                                    </IconButton>
                                    <Box sx={{ marginLeft: "auto" }}>
                                        <IconButton
                                            onClick={() => {
                                                onRemove(idx);
                                            }}
                                            color="primary"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            <Box sx={{ position: "fixed", bottom: "1rem", right: "1rem" }}>
                <Fab
                    onClick={() => {
                        setShowAddCategoryDialog(true);
                    }}
                    color="primary"
                    aria-label="add"
                >
                    <AddIcon />
                </Fab>
            </Box>
            <AddCategoriesDialog
                open={showAddCategoryDialog}
                onClose={() => setShowAddCategoryDialog(false)}
                activeItemCategoryIds={availableItems.map(
                    (item) => item.itemCategoryId
                )}
                onAddCategoryIds={(itemCategoryIds) => {
                    setAvailableItems([
                        ...availableItems,
                        ...itemCategoryIds.map((id) => ({
                            itemCategoryId: id,
                            quantity: initialItemQuantity,
                        })),
                    ]);
                }}
            />
        </Container>
    );
};

export default ManageItems;
