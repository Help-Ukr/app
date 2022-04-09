import { Paper } from '@mui/material';
import type { NextPage } from 'next';
import { useTr } from '~/texts';
import { HeroSection } from '~/view/herosection';
import { PageLayout } from '~/view/pagelayout';
import { SelectUserStory } from '~/view/selectuserstory';

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
