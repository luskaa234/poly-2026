import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';
import { products, formatPrice, calculateDiscount } from '@/data/products';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

// Get featured products for drops
const dropsProducts = products.filter(p => p.isNew || p.featured).slice(0, 6);

const HeroSidecarMobile = () => {
  return (
    <section className="xl:hidden py-6 bg-muted/50">
      <div className="container-poly">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg font-medium flex items-center gap-2">
            <Flame className="w-5 h-5 text-gold" />
            Drops da Semana
          </h3>
          <Link to="/catalogo?filter=new" className="text-sm text-accent hover:underline flex items-center gap-1">
            Ver todos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {dropsProducts.map((product, index) => {
              const hasPromo = product.promoPrice && product.promoPrice < product.price;
              const discount = hasPromo ? calculateDiscount(product.price, product.promoPrice!) : 0;
              
              return (
                <CarouselItem key={product.id} className="pl-2 basis-1/2 sm:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link 
                      to={`/produto/${product.slug}`}
                      className="block bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="relative aspect-[3/4]">
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          {product.isNew && (
                            <span className="badge-new text-[10px] px-1.5 py-0.5">
                              Novo
                            </span>
                          )}
                          {hasPromo && (
                            <span className="badge-promo text-[10px] px-1.5 py-0.5">
                              -{discount}%
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium truncate">
                          {product.name}
                        </p>
                        <div className="mt-1">
                          {hasPromo ? (
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-destructive">
                                {formatPrice(product.promoPrice!)}
                              </span>
                              <span className="text-xs text-muted-foreground line-through">
                                {formatPrice(product.price)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm font-semibold">
                              {formatPrice(product.price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default HeroSidecarMobile;
