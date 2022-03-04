import type { NextPage } from "next";
import PageLayout from "../components/PageLayout";
import MapWithLocations from "../components/MapWithLocations";

const Transport: NextPage = () => {
  return (
    <PageLayout>
      <MapWithLocations />
    </PageLayout>
  );
};

export default Transport;
