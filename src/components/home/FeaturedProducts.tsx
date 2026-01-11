import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getFeaturedProducts } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

const FeaturedProducts = () => {
  const products = getFeaturedProducts();

  return (
    // ⬇️ AJUSTE PRINCIPAL AQUI
    <section className="pt-6 pb-16 md:pb-24">
      {/* 
        pt-6  → cola nas categorias
        pb-16 → mantém respiro elegante abaixo
      */}
      <div className="container-poly">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8"
        >
          <div>
            <h2 className="section-title">Destaques</h2>
            <p className="section-subtitle mt-1">
              Peças selecionadas para elevar seu estilo
            </p>
          </div>

          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            Ver tudo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 md:gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;