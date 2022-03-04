import type { NextPage } from "next";
import PageLayout from "../components/PageLayout";
import ManageCollectionPoint from "../components/ManageCollectionPoint";

const CollectionPointPage: NextPage = () => {
  return (
    <PageLayout>
      <ManageCollectionPoint />
    </PageLayout>
  );
};

export default CollectionPointPage;
