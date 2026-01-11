import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Percent, Clock, Tag } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/product/ProductCard';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';

const Promocoes = () => {
  const [sortBy, setSortBy] = useState<'discount' | 'price' | 'name'>('discount');

  const promoProducts = useMemo(() => {
    const filtered = products.filter(p => p.promoPrice);
    
    return filtered.sort((a, b) => {
      if (sortBy === 'discount') {
        const discountA = ((a.price - (a.promoPrice || a.price)) / a.price) * 100;
        const discountB = ((b.price - (b.promoPrice || b.price)) / b.price) * 100;
        return discountB - discountA;
      }
      if (sortBy === 'price') {
        return (a.promoPrice || a.price) - (b.promoPrice || b.price);
      }
      return a.name.localeCompare(b.name);
    });
  }, [sortBy]);

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiIGN4PSIyMCIgY3k9IjIwIiByPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
        
        <div className="container-poly relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-4">
              <Percent className="w-4 h-4" />
              Ofertas Exclusivas
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">
              Promoções Imperdíveis
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-6">
              Aproveite descontos de até 50% em peças selecionadas. Estoque limitado!
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Ofertas por tempo limitado
              </span>
              <span className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {promoProducts.length} produtos em promoção
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-muted/30 border-b border-border">
        <div className="container-poly">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-muted-foreground">
              Mostrando <strong className="text-foreground">{promoProducts.length}</strong> produtos em promoção
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Ordenar:</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={sortBy === 'discount' ? 'default' : 'outline'}
                  onClick={() => setSortBy('discount')}
                >
                  Maior desconto
                </Button>
                <Button
                  size="sm"
                  variant={sortBy === 'price' ? 'default' : 'outline'}
                  onClick={() => setSortBy('price')}
                >
                  Menor preço
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container-poly">
          {promoProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {promoProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Percent className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-medium mb-2">Nenhuma promoção ativa</h2>
              <p className="text-muted-foreground">
                Volte em breve para conferir novas ofertas!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-primary">
        <div className="container-poly text-center">
          <h2 className="text-2xl font-serif text-primary-foreground mb-4">
            Não perca nenhuma promoção!
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
            Cadastre-se e receba ofertas exclusivas diretamente no seu e-mail.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-accent"
            />
            <Button className="btn-gold whitespace-nowrap">
              Quero Receber
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Promocoes;
