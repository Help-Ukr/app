import HeroSection from '@cmts/HeroSection';
import PageLayout from '@cmts/PageLayout';
import SelectUserStory from '@cmts/SelectUserStory';
import type { NextPage } from 'next';
import { useTr } from '~/texts';

const Home: NextPage = () => {
    const [tr] = useTr('home');

    return (
        <PageLayout>
            <HeroSection title={tr('title')} subtitle={tr('subtitle')} imgSrc="/images/hero.jpg" />
            <SelectUserStory />
        </PageLayout>
    );
};

export default Home;
