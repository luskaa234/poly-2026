import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Truck,
  RefreshCw,
  Shield,
  Minus,
  Plus,
  ShoppingBag,
  Zap,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/product/ProductCard';
import VideoAssistant from '@/components/product/VideoAssistant';
import { getProductBySlug, products, formatPrice, calculateDiscount } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Size chart data
const sizeChart = {
  headers: ['Tamanho', 'Peito (cm)', 'Comprimento (cm)', 'Manga (cm)'],
  rows: [
    ['P', '100-104', '70', '20'],
    ['M', '104-108', '72', '21'],
    ['G', '108-112', '74', '22'],
    ['GG', '112-116', '76', '23'],
    ['XG', '116-120', '78', '24'],
  ],
};

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const { addItem, setCartOpen } = useCart();
  const { toast } = useToast();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [cep, setCep] = useState('');

  useEffect(() => {
    if (product) {
      const firstAvailableColor = product.colors.find(c => c.available);
      const firstAvailableSize = product.sizes.find(s => s.available);
      if (firstAvailableColor) setSelectedColor(firstAvailableColor.name);
      if (firstAvailableSize) setSelectedSize(firstAvailableSize.name);
    }
  }, [product]);

  if (!product) {
    return (
      <Layout>
        <div className="container-poly py-16 text-center">
          <h1 className="text-2xl font-serif mb-4">Produto não encontrado</h1>
          <Link to="/catalogo" className="text-accent hover:underline">
            Voltar ao catálogo
          </Link>
        </div>
      </Layout>
    );
  }

  const hasPromo = product.promoPrice && product.promoPrice < product.price;
  const discount = hasPromo ? calculateDiscount(product.price, product.promoPrice!) : 0;
  const currentPrice = product.promoPrice || product.price;

  const stockKey = `${selectedColor}-${selectedSize}`;
  const currentStock = product.stockByVariant[stockKey] || 0;

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast({
        title: 'Selecione as opções',
        description: 'Escolha cor e tamanho antes de adicionar ao carrinho.',
        variant: 'destructive',
      });
      return;
    }

    addItem({
      product,
      quantity,
      selectedColor,
      selectedSize,
    });

    toast({
      title: 'Produto adicionado!',
      description: `${product.name} foi adicionado ao carrinho.`,
    });

    setCartOpen(true);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to checkout would happen here
  };

  const formatCep = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 9);
  };

  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted py-3">
        <div className="container-poly">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link to="/catalogo" className="text-muted-foreground hover:text-foreground">
              Catálogo
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-poly py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && <span className="badge-new">Novo</span>}
                {hasPromo && <span className="badge-promo">-{discount}%</span>}
              </div>

              {/* Nav Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-card/80 rounded-full hover:bg-card transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImage(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-card/80 rounded-full hover:bg-card transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </motion.div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-24 rounded overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-accent' : 'border-transparent hover:border-muted-foreground/30'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-medium mb-2">{product.name}</h1>
              <p className="text-muted-foreground">{product.category}</p>
            </div>

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                {hasPromo ? (
                  <>
                    <span className="text-3xl font-semibold text-destructive">
                      {formatPrice(product.promoPrice!)}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-semibold">{formatPrice(product.price)}</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                ou 3x de {formatPrice(currentPrice / 3)} sem juros
              </p>
            </div>

            {/* Color Selector */}
            <div>
              <h4 className="font-medium mb-3">
                Cor: <span className="font-normal text-muted-foreground">{selectedColor}</span>
              </h4>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => color.available && setSelectedColor(color.name)}
                    disabled={!color.available}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? 'ring-2 ring-accent ring-offset-2'
                        : 'border-border hover:scale-110'
                    } ${!color.available ? 'opacity-40 cursor-not-allowed' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">
                  Tamanho: <span className="font-normal text-muted-foreground">{selectedSize}</span>
                </h4>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-sm text-accent hover:underline">
                      Tabela de medidas
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Tabela de Medidas</DialogTitle>
                    </DialogHeader>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            {sizeChart.headers.map(header => (
                              <th key={header} className="py-2 px-3 text-left font-medium">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sizeChart.rows.map((row, index) => (
                            <tr key={index} className="border-b last:border-0">
                              {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="py-2 px-3">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size.name}
                    onClick={() => size.available && setSelectedSize(size.name)}
                    disabled={!size.available}
                    className={`min-w-[48px] h-12 px-4 rounded border-2 font-medium transition-colors ${
                      selectedSize === size.name
                        ? 'border-accent bg-accent text-accent-foreground'
                        : 'border-border hover:border-accent'
                    } ${!size.available ? 'opacity-40 cursor-not-allowed line-through' : ''}`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
              {currentStock > 0 && currentStock <= 5 && (
                <p className="text-sm text-destructive mt-2">
                  Apenas {currentStock} unidades disponíveis!
                </p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <h4 className="font-medium mb-3">Quantidade</h4>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => Math.min(currentStock, q + 1))}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Shipping Calculator */}
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Calcular Frete
              </h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={cep}
                  onChange={(e) => setCep(formatCep(e.target.value))}
                  placeholder="00000-000"
                  className="flex-1 px-4 py-2 border border-border rounded bg-card focus:outline-none focus:ring-2 focus:ring-accent"
                  maxLength={9}
                />
                <Button variant="outline">Calcular</Button>
              </div>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>PAC</span>
                  <span>R$ 18,90 - 5 a 8 dias úteis</span>
                </div>
                <div className="flex justify-between">
                  <span>SEDEX</span>
                  <span>R$ 32,90 - 2 a 4 dias úteis</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAddToCart}
                size="lg"
                variant="outline"
                className="flex-1 gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Adicionar ao Carrinho
              </Button>
              <Button onClick={handleBuyNow} size="lg" className="flex-1 btn-gold gap-2">
                <Zap className="w-5 h-5" />
                Comprar Agora
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <Truck className="w-5 h-5 mx-auto mb-1 text-accent" />
                <span className="text-xs text-muted-foreground">Frete Rápido</span>
              </div>
              <div className="text-center">
                <RefreshCw className="w-5 h-5 mx-auto mb-1 text-accent" />
                <span className="text-xs text-muted-foreground">Troca Fácil</span>
              </div>
              <div className="text-center">
                <Shield className="w-5 h-5 mx-auto mb-1 text-accent" />
                <span className="text-xs text-muted-foreground">Compra Segura</span>
              </div>
            </div>

            {/* Product Details Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="description">
                <AccordionTrigger>Descrição</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{product.description}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="material">
                <AccordionTrigger>Material</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{product.material}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="care">
                <AccordionTrigger>Cuidados</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{product.care}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="exchange">
                <AccordionTrigger>Trocas e Devoluções</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Você tem até 30 dias para trocar ou devolver seu produto. 
                    A primeira troca é gratuita. Para mais informações, entre em contato pelo WhatsApp.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-16 border-t border-border">
            <h2 className="section-title mb-8">Você também vai gostar</h2>
            <div className="grid-products">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Video Assistant */}
      <VideoAssistant videoUrl={product.videoUrl} productName={product.name} />
    </Layout>
  );
};

export default ProductPage;
