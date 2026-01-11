import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import CategoryCircles from '@/components/home/CategoryCircles';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import PromoSection from '@/components/home/PromoSection';
import InstagramSection from '@/components/home/InstagramSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <CategoryCircles />
      <FeaturedProducts />
      <PromoSection />
      <InstagramSection />
    </Layout>
  );
};

export default Index;
