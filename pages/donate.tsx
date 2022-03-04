import type { NextPage } from "next";
import PageLayout from "../components/PageLayout";
import MapWithLocations from "../components/MapWithLocations";

const Donate: NextPage = () => {
  return (
    <PageLayout>
      <MapWithLocations />
    </PageLayout>
  );
};

export default Donate;
