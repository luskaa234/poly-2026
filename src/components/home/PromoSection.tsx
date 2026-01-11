import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Clock, Percent, ShoppingBag } from 'lucide-react';
import { products, formatPrice, calculateDiscount } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

// Get promo products
const promoProducts = products.filter(p => p.promoPrice).slice(0, 6);

const PromoSection = () => {
  const { addItem, setCartOpen } = useCart();
  const { toast } = useToast();

  const handleQuickAdd = (product: typeof promoProducts[0]) => {
    const firstColor = product.colors.find(c => c.available);
    const firstSize = product.sizes.find(s => s.available);
    
    if (firstColor && firstSize) {
      addItem({
        product,
        quantity: 1,
        selectedColor: firstColor.name,
        selectedSize: firstSize.name,
      });
      toast({
        title: 'Adicionado ao carrinho!',
        description: product.name,
      });
      setCartOpen(true);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-navy via-navy-dark to-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-poly relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Ofertas por Tempo Limitado
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-cream mb-4">
            Promoções Imperdíveis
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto">
            Aproveite descontos exclusivos em peças selecionadas. Estoque limitado!
          </p>
        </motion.div>

        {/* Countdown Timer (mock) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <div className="flex items-center gap-2 text-cream">
            <Clock className="w-5 h-5 text-gold" />
            <span className="text-sm">Ofertas acabam em:</span>
          </div>
          <div className="flex gap-2">
            {[
              { value: '02', label: 'Dias' },
              { value: '14', label: 'Horas' },
              { value: '35', label: 'Min' },
            ].map((item, index) => (
              <div key={index} className="bg-gold/20 backdrop-blur-sm rounded-lg px-3 py-2 text-center min-w-[60px]">
                <span className="text-xl md:text-2xl font-bold text-gold">{item.value}</span>
                <p className="text-xs text-cream/70">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-12">
          {promoProducts.map((product, index) => {
            const discount = calculateDiscount(product.price, product.promoPrice!);
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group"
              >
                <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <Link to={`/produto/${product.slug}`} className="block relative">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Discount Badge */}
                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-destructive text-white px-2 py-1 rounded-full text-xs font-bold">
                      <Percent className="w-3 h-3" />
                      -{discount}%
                    </div>
                  </Link>
                  
                  <div className="p-3">
                    <Link to={`/produto/${product.slug}`}>
                      <h3 className="text-sm font-medium truncate group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-destructive font-bold">
                        {formatPrice(product.promoPrice!)}
                      </span>
                      <span className="text-xs text-muted-foreground line-through">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <Button
                      onClick={() => handleQuickAdd(product)}
                      size="sm"
                      className="w-full mt-3 btn-gold gap-1 text-xs"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      Comprar
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/promocoes">
            <Button size="lg" className="btn-outline-gold gap-2 bg-transparent border-gold text-gold hover:bg-gold hover:text-navy">
              Ver Todas as Ofertas
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoSection;
