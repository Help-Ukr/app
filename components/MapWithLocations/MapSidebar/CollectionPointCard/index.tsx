import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import React from "react";
import MoreIcon from "@mui/icons-material/MoreHoriz";

import { CollectionPoint, ITEM_CATEGORIES } from "../../../../api-client";

type Props = {
  collectionPoint: CollectionPoint;
  mode: "show-available-items" | "show-needed-items";
};

const CollectionPointCard = ({ collectionPoint, mode }: Props) => {
  const items =
    mode === "show-available-items"
      ? collectionPoint.availableItems
      : collectionPoint.neededItems;

  const MAX_ITEMS_TO_SHOW = 6;

  return (
    <Card sx={{ display: "flex", width: "100%" }}>
      <CardMedia
        component="img"
        sx={{ width: "25%" }}
        image={collectionPoint.coverImg}
        alt={`Donations from ${collectionPoint.displayName}`}
      />
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography component="div" variant="h6">
          {collectionPoint.displayName}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" component="div">
          {collectionPoint.location.address}
        </Typography>
        <Typography sx={{ mt: 2 }} variant="subtitle2" component="div">
          {items.slice(0, MAX_ITEMS_TO_SHOW).map((item) => {
            const foundItem = ITEM_CATEGORIES.find(
              (category) => category.id === item.itemCategoryId
            );
            return foundItem?.icon ?? "";
          })}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <MoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CollectionPointCard;
