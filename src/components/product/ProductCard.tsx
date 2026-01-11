import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product, formatPrice, calculateDiscount } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addItem, setCartOpen } = useCart();
  const { toast } = useToast();

  const hasPromo = product.promoPrice && product.promoPrice < product.price;
  const discount = hasPromo ? calculateDiscount(product.price, product.promoPrice!) : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const availableColor = product.colors.find(c => c.available);
    const availableSize = product.sizes.find(s => s.available);

    if (availableColor && availableSize) {
      addItem({
        product,
        quantity: 1,
        selectedColor: availableColor.name,
        selectedSize: availableSize.name,
      });

      toast({
        title: 'Produto adicionado!',
        description: `${product.name} foi adicionado ao carrinho.`,
      });

      setCartOpen(true);
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);

    toast({
      title: isFavorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos',
      description: product.name,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link
        to={`/produto/${product.slug}`}
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="card-product relative">
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-muted">
            <img
              src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isNew && (
                <span className="badge-new">Novo</span>
              )}
              {hasPromo && (
                <span className="badge-promo">-{discount}%</span>
              )}
            </div>

            {/* Favorite Button */}
            <button
              onClick={handleFavorite}
              className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
                isFavorite 
                  ? 'bg-destructive text-white' 
                  : 'bg-card/80 hover:bg-card text-foreground'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-foreground/80 to-transparent"
            >
              <div className="flex gap-2">
                <button
                  onClick={handleQuickAdd}
                  className="flex-1 py-2.5 px-4 bg-card text-foreground text-sm font-medium rounded hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Adicionar
                </button>
                <Link
                  to={`/produto/${product.slug}`}
                  className="p-2.5 bg-card text-foreground rounded hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-2 group-hover:text-accent transition-colors">
              {product.name}
            </h3>

            {/* Color Swatches */}
            <div className="flex gap-1 mb-2">
              {product.colors.slice(0, 4).map((color) => (
                <div
                  key={color.name}
                  className={`w-4 h-4 rounded-full border-2 border-border ${
                    !color.available ? 'opacity-40' : ''
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-muted-foreground">+{product.colors.length - 4}</span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              {hasPromo ? (
                <>
                  <span className="price-promo">{formatPrice(product.promoPrice!)}</span>
                  <span className="price-original">{formatPrice(product.price)}</span>
                </>
              ) : (
                <span className="price-current">{formatPrice(product.price)}</span>
              )}
            </div>

            {/* Installments */}
            <p className="text-xs text-muted-foreground mt-1">
              ou 3x de {formatPrice((product.promoPrice || product.price) / 3)} sem juros
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
