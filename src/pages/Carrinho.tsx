import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/product/ProductCard';
import { useCart } from '@/contexts/CartContext';
import { formatPrice, products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Carrinho = () => {
  const { items, updateQuantity, removeItem, subtotal, totalItems, clearCart } = useCart();
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const { toast } = useToast();

  const suggestedProducts = products.filter(p => !items.some(item => item.product.id === p.id)).slice(0, 4);

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'POLY10') {
      setAppliedCoupon({ code: 'POLY10', discount: 10 });
      toast({
        title: 'Cupom aplicado!',
        description: '10% de desconto aplicado ao seu pedido.',
      });
    } else {
      toast({
        title: 'Cupom inválido',
        description: 'Verifique o código e tente novamente.',
        variant: 'destructive',
      });
    }
    setCoupon('');
  };

  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const total = subtotal - discountAmount;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-poly py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <ShoppingBag className="w-20 h-20 text-muted-foreground/30 mx-auto mb-6" />
            <h1 className="text-3xl font-serif font-medium mb-4">Seu carrinho está vazio</h1>
            <p className="text-muted-foreground mb-8">
              Parece que você ainda não adicionou nenhum produto ao carrinho.
            </p>
            <Link to="/catalogo">
              <Button size="lg" className="btn-gold gap-2">
                Continuar Comprando
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Suggestions */}
          <section className="mt-16 pt-16 border-t border-border">
            <h2 className="section-title text-center mb-8">Talvez você goste</h2>
            <div className="grid-products">
              {suggestedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </section>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-poly py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-serif font-medium mb-2">Carrinho</h1>
          <p className="text-muted-foreground mb-8">{totalItems} itens no carrinho</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 p-4 bg-card rounded-lg border border-border"
              >
                <Link to={`/produto/${item.product.slug}`} className="flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-24 h-32 md:w-32 md:h-40 object-cover rounded"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/produto/${item.product.slug}`}
                    className="font-medium hover:text-accent transition-colors line-clamp-2"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.selectedColor} • {item.selectedSize}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-2">
                    {item.product.promoPrice ? (
                      <>
                        <span className="font-semibold text-destructive">
                          {formatPrice(item.product.promoPrice)}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(item.product.price)}
                        </span>
                      </>
                    ) : (
                      <span className="font-semibold">{formatPrice(item.product.price)}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedColor,
                            item.selectedSize,
                            item.quantity - 1
                          )
                        }
                        className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedColor,
                            item.selectedSize,
                            item.quantity + 1
                          )
                        }
                        className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() =>
                        removeItem(item.product.id, item.selectedColor, item.selectedSize)
                      }
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            <Button
              variant="ghost"
              onClick={clearCart}
              className="text-muted-foreground hover:text-destructive"
            >
              Limpar carrinho
            </Button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-lg border border-border p-6 space-y-6">
              <h2 className="font-serif text-xl font-medium">Resumo do Pedido</h2>

              {/* Coupon */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Cupom de desconto
                </label>
                <div className="flex gap-2">
                  <Input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Digite o código"
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={handleApplyCoupon}>
                    Aplicar
                  </Button>
                </div>
                {appliedCoupon && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                    <Tag className="w-4 h-4" />
                    <span>Cupom {appliedCoupon.code} aplicado!</span>
                    <button
                      onClick={() => setAppliedCoupon(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Remover
                    </button>
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto ({appliedCoupon.discount}%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="text-muted-foreground">Calculado no checkout</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-border">
                  <span className="font-medium text-lg">Total</span>
                  <span className="font-serif text-2xl font-semibold">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link to="/checkout" className="block">
                <Button size="lg" className="w-full btn-gold gap-2">
                  Finalizar Compra
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <Link
                to="/catalogo"
                className="block text-center text-sm text-accent hover:underline"
              >
                Continuar comprando
              </Link>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        {suggestedProducts.length > 0 && (
          <section className="mt-16 pt-16 border-t border-border">
            <h2 className="section-title mb-8">Aproveite e leve também</h2>
            <div className="grid-products">
              {suggestedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default Carrinho;
