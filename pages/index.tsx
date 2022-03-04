import type { NextPage } from "next";
import HeroSection from "../components/HeroSection";
import PageLayout from "../components/PageLayout";
import SelectUserStory from "../components/SelectUserStory";

const Home: NextPage = () => {
  return (
    <PageLayout>
      <HeroSection
        title="Managing all material donations in one place"
        subtitle="Take part and help the Ukraine now!"
        imgSrc="/images/hero.jpg"
      />
      <SelectUserStory />
    </PageLayout>
  );
};

export default Home;
