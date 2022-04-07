import HeroSection from '@cmts/HeroSection';
import PageLayout from '@cmts/PageLayout';
import SelectUserStory from '@cmts/SelectUserStory';
import { Paper } from '@mui/material';
import type { NextPage } from 'next';
import { useTr } from '~/texts';

const Home: NextPage = () => {
    const [tr] = useTr('home');

    return (
        <PageLayout>
            <Paper>
                <HeroSection title={tr('title')} subtitle={tr('subtitle')} imgSrc="/images/hero.jpg" />
                <SelectUserStory />
            </Paper>
        </PageLayout>
    );
};

export default Home;
