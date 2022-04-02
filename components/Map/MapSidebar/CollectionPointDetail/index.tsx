import { Box, Paper } from "@mui/material";
import React from "react";
import { CollectionPoint } from "../../../../api-client";

type Props = {
  collectionPoint: CollectionPoint;
};

const CollectionPointDetail: React.FC<Props> = ({
  collectionPoint,
  children,
}) => {
  return (
    <Paper
      sx={{
        width: "100%",
        height: "100vh",
      }}
    ></Paper>
  );
};

export default CollectionPointDetail;
