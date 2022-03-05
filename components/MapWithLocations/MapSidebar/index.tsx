import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { COLLECTION_POINTS } from "../../../api-client";
import { MapSidebarProps } from "../../MapWithLocationSearch";
import CollectionPointCard from "./CollectionPointCard";

const MapSidebar = ({ children }: MapSidebarProps) => {
  return (
    <Box
      sx={{
        p: {
          md: 1,
        },
      }}
    >
      <Paper>{children}</Paper>
      <Box
        sx={{
          maxHeight: "80vh",
          overflowY: "auto",
          mt: 1,
        }}
      >
        {COLLECTION_POINTS.map((collectionPoint, idx) => (
          <Box sx={{ mt: 1 }} key={idx}>
            <CollectionPointCard
              mode="show-needed-items"
              collectionPoint={collectionPoint}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MapSidebar;
