import { Container, Tab, Tabs, Paper } from "@mui/material";
import React, { useState } from "react";
import CollectionPointHeader from "./CollectionPointHeader";
import EditGeneralCollectionPointData from "./EditGeneralCollectionPointData";

type Props = {};

type CollectionPointTab = "general" | "available-items" | "needed-items";

const ManageCollectionPoint = (props: Props) => {
  const [activeTab, setActiveTab] = useState<CollectionPointTab>("general");

  return (
    <Paper sx={{ minHeight: "100vh" }}>
      <CollectionPointHeader
        orgName="Space Medusa"
        bgImg="https://source.unsplash.com/random/1920x1080?restaurant"
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
        <Tab value="available-items" label="Available Items" />
      </Tabs>
      {activeTab === "general" && <EditGeneralCollectionPointData />}
    </Paper>
  );
};

export default ManageCollectionPoint;
