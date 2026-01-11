import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, RefreshCw, Shield, Flame } from 'lucide-react';
import { products, formatPrice, calculateDiscount } from '@/data/products';
import { Button } from '@/components/ui/button';

// Get featured products for drops
const dropsProducts = products.filter(p => p.isNew).slice(0, 3);
const bestSellers = products.filter(p => p.featured && !p.isNew).slice(0, 2);

const HeroSidecar = () => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="hidden xl:flex flex-col w-80 2xl:w-96 gap-4 flex-shrink-0"
    >
      {/* Drops da Semana */}
      <div className="bg-card rounded-lg shadow-md overflow-hidden">
        <div className="bg-primary text-primary-foreground px-4 py-3">
          <h3 className="font-serif text-lg font-medium flex items-center gap-2">
            <Flame className="w-5 h-5 text-gold" />
            Drops da Semana
          </h3>
        </div>
        <div className="p-3 space-y-3">
          {dropsProducts.map((product, index) => {
            const hasPromo = product.promoPrice && product.promoPrice < product.price;
            const discount = hasPromo ? calculateDiscount(product.price, product.promoPrice!) : 0;
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Link 
                  to={`/produto/${product.slug}`}
                  className="flex gap-3 p-2 rounded-lg hover:bg-muted transition-colors group"
                >
                  <div className="relative w-16 h-20 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.isNew && (
                      <span className="absolute top-1 left-1 badge-new text-[10px] px-1.5 py-0.5">
                        Novo
                      </span>
                    )}
                    {hasPromo && (
                      <span className="absolute top-1 right-1 badge-promo text-[10px] px-1.5 py-0.5">
                        -{discount}%
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate group-hover:text-accent transition-colors">
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
            );
          })}
          <Link to="/catalogo?filter=new">
            <Button variant="outline" size="sm" className="w-full mt-2 gap-2">
              Ver Catálogo
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Mais Vendidos */}
      <div className="bg-card rounded-lg shadow-md overflow-hidden">
        <div className="bg-gold/20 px-4 py-3 border-b border-gold/30">
          <h3 className="font-serif text-base font-medium text-foreground">
            ⭐ Mais Vendidos
          </h3>
        </div>
        <div className="p-3 space-y-2">
          {bestSellers.map((product) => (
            <Link 
              key={product.id}
              to={`/produto/${product.slug}`}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors group"
            >
              <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {product.name}
                </p>
                <p className="text-sm text-accent font-semibold">
                  {formatPrice(product.promoPrice || product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-muted rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Truck className="w-5 h-5 text-accent flex-shrink-0" />
          <span>Frete grátis acima de R$299</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <RefreshCw className="w-5 h-5 text-accent flex-shrink-0" />
          <span>Primeira troca grátis</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Shield className="w-5 h-5 text-accent flex-shrink-0" />
          <span>Pagamento 100% seguro</span>
        </div>
      </div>
    </motion.aside>
  );
};

export default HeroSidecar;
