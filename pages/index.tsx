import type { NextPage } from 'next';
import { useTr } from '~/texts';
import { HeroSection } from '~/view/herosection';
import { PageLayout } from '~/view/pagelayout';
import { SelectUserStory } from '~/view/selectuserstory';

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
