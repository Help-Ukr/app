import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ItemCategory, ITEM_CATEGORIES } from "../../../api-client";

type Props = {
  open: boolean;
  onClose: () => void;
  onAddCategoryIds: (itemCategoryIds: string[]) => void;
  activeItemCategoryIds: string[];
};

const AddCategoriesDialog = ({
  open,
  activeItemCategoryIds,
  onAddCategoryIds,
  onClose,
}: Props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const categoriesToRender = ITEM_CATEGORIES.filter(
    (itemCategory) => !activeItemCategoryIds.includes(itemCategory.id)
  );

  const [localActiveItemCategoryIds, setLocalActiveItemCategoryIds] = useState<
    string[]
  >(activeItemCategoryIds);

  useEffect(() => {
    setLocalActiveItemCategoryIds(activeItemCategoryIds);
  }, [activeItemCategoryIds]);

  return (
    <Dialog onClose={onClose} open={open} fullScreen={fullScreen}>
      <DialogTitle id="responsive-dialog-title">Add items</DialogTitle>
      <DialogContent>
        <List dense>
          {categoriesToRender.map((category) => (
            <ListItem
              key={category.id}
              secondaryAction={
                <Checkbox
                  color="secondary"
                  edge="end"
                  onChange={() => {
                    setLocalActiveItemCategoryIds(
                      localActiveItemCategoryIds.includes(category.id)
                        ? localActiveItemCategoryIds.filter(
                            (itemCategoryId) => itemCategoryId !== category.id
                          )
                        : [...localActiveItemCategoryIds, category.id]
                    );
                  }}
                  checked={localActiveItemCategoryIds.includes(category.id)}
                />
              }
            >
              <ListItemAvatar>
                <span role="img" aria-label={category.displayName}>
                  {category.icon}
                </span>
              </ListItemAvatar>
              <ListItemText primary={category.displayName} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            onAddCategoryIds(
              localActiveItemCategoryIds.filter(
                (itemCategoryId) =>
                  !activeItemCategoryIds.includes(itemCategoryId)
              )
            );
            onClose();
          }}
          color="secondary"
          autoFocus
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoriesDialog;
