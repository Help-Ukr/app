import type { NextPage } from 'next';
import { useTr } from '~/texts';
import HeroSection from '../components/HeroSection';
import PageLayout from '../components/PageLayout';
import SelectUserStory from '../components/SelectUserStory';

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
