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
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/DeleteForever";

import React, { useState } from "react";
import AddCategoriesDialog from "../AddCategoriesDialog";
import { Box } from "@mui/system";
import { AvailableItem, ITEM_CATEGORIES } from "../../../api-client";

type Props = {};

const availableItemsInitial: AvailableItem[] = [
  {
    itemCategoryId: "2",
    quantity: 50,
  },
  {
    itemCategoryId: "4",
    quantity: 25,
  },
];

const ManageAvailableItems = (props: Props) => {
  const [showAddCategoryDialog, setShowAddCategoryDialog] =
    useState<boolean>(false);

  const [availableItems, setAvailableItems] = useState<AvailableItem[]>(
    availableItemsInitial
  );

  function onIncrement(index: number) {
    const newAvailableItems = [...availableItems];
    newAvailableItems[index].quantity++;
    setAvailableItems(newAvailableItems);
  }

  function onDecrement(index: number) {
    const newAvailableItems = [...availableItems];
    newAvailableItems[index].quantity--;
    setAvailableItems(newAvailableItems);
  }

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
            (itemCategory) => itemCategory.id === availableItem.itemCategoryId
          );
          return (
            <Grid key={availableItem.itemCategoryId} item xs={6} md={4}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {availableItem.quantity}x {itemCategory!.icon}{" "}
                    {itemCategory!.displayName}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    onClick={() => {
                      onIncrement(idx);
                    }}
                    color="primary"
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      onDecrement(idx);
                    }}
                    color="primary"
                  >
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
              quantity: 1,
            })),
          ]);
        }}
      />
    </Container>
  );
};

export default ManageAvailableItems;
