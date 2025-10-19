import { HeroSearch } from '../components/home/HeroSearch';
import { HighlightsCarousel } from '../components/home/HighlightsCarousel';
import { PromotionsGrid } from '../components/home/PromotionsGrid';
import { WeatherWidget } from '../components/home/WeatherWidget';
import { SocialMasonry } from '../components/home/SocialMasonry';

function Home() {
  return (
    <div>
      <HeroSearch />
      <HighlightsCarousel />
      <PromotionsGrid />
      <WeatherWidget />
      <SocialMasonry />
    </div>
  );
}

export default Home;