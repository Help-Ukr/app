import HeroSection from '@cmts/HeroSection';
import PageLayout from '@cmts/PageLayout';
import SelectUserStory from '@cmts/SelectUserStory';
import type { NextPage } from 'next';

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
