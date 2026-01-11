import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, Grid3X3, LayoutGrid, X } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/product/ProductCard';
import { products, categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

const sizes = ['P', 'M', 'G', 'GG', 'XG'];
const colors = [
  { name: 'Preto', hex: '#1a1a1a' },
  { name: 'Branco', hex: '#ffffff' },
  { name: 'Vermelho', hex: '#C41E3A' },
  { name: 'Marrom', hex: '#8B6F5C' },
  { name: 'Bege', hex: '#E8DCC4' },
];

const Catalogo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [onlyPromo, setOnlyPromo] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  const activeCategory = searchParams.get('category') || 'all';
  const isNew = searchParams.get('filter') === 'new';

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory && activeCategory !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    // New filter
    if (isNew) {
      result = result.filter(p => p.isNew);
    }

    // Promo filter
    if (onlyPromo) {
      result = result.filter(p => p.promoPrice);
    }

    // In stock filter
    if (onlyInStock) {
      result = result.filter(p => {
        const totalStock = Object.values(p.stockByVariant).reduce((sum, qty) => sum + qty, 0);
        return totalStock > 0;
      });
    }

    // Price filter
    result = result.filter(p => {
      const price = p.promoPrice || p.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Size filter
    if (selectedSizes.length > 0) {
      result = result.filter(p =>
        p.sizes.some(s => selectedSizes.includes(s.name) && s.available)
      );
    }

    // Color filter
    if (selectedColors.length > 0) {
      result = result.filter(p =>
        p.colors.some(c => selectedColors.includes(c.name) && c.available)
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.promoPrice || a.price) - (b.promoPrice || b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.promoPrice || b.price) - (a.promoPrice || a.price));
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [activeCategory, isNew, onlyPromo, onlyInStock, priceRange, selectedSizes, selectedColors, sortBy]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 500]);
    setOnlyPromo(false);
    setOnlyInStock(false);
    setSearchParams({});
  };

  const hasActiveFilters = selectedSizes.length > 0 || selectedColors.length > 0 || onlyPromo || onlyInStock || activeCategory !== 'all';

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="font-medium mb-3">Categorias</h4>
        <div className="space-y-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSearchParams(cat.slug ? { category: cat.slug } : {})}
              className={`block w-full text-left py-2 px-3 rounded transition-colors ${
                (activeCategory === cat.slug || (cat.slug === '' && activeCategory === 'all'))
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">Preço</h4>
        <Slider
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          max={500}
          step={10}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>R$ {priceRange[0]}</span>
          <span>R$ {priceRange[1]}</span>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h4 className="font-medium mb-3">Tamanhos</h4>
        <div className="flex flex-wrap gap-2">
          {sizes.map(size => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`w-10 h-10 rounded border-2 text-sm font-medium transition-colors ${
                selectedSizes.includes(size)
                  ? 'border-accent bg-accent text-accent-foreground'
                  : 'border-border hover:border-accent'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h4 className="font-medium mb-3">Cores</h4>
        <div className="flex flex-wrap gap-2">
          {colors.map(color => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              title={color.name}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                selectedColors.includes(color.name)
                  ? 'ring-2 ring-accent ring-offset-2'
                  : 'border-border hover:scale-110'
              }`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>

      {/* Promo Only */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="promo"
          checked={onlyPromo}
          onCheckedChange={(checked) => setOnlyPromo(checked as boolean)}
        />
        <label htmlFor="promo" className="text-sm cursor-pointer">
          Apenas promoções
        </label>
      </div>

      {/* In Stock Only */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="instock"
          checked={onlyInStock}
          onCheckedChange={(checked) => setOnlyInStock(checked as boolean)}
        />
        <label htmlFor="instock" className="text-sm cursor-pointer">
          Disponível em estoque
        </label>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          Limpar Filtros
        </Button>
      )}
    </div>
  );

  return (
    <Layout>
      <div className="container-poly py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-serif font-medium mb-2">
            {isNew ? 'Novidades' : categories.find(c => c.slug === activeCategory)?.name || 'Todos os Produtos'}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} produtos encontrados
          </p>
        </motion.div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-6 border-b border-border">
          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden gap-2">
                <Filter className="w-4 h-4" />
                Filtros
                {hasActiveFilters && (
                  <span className="w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                    !
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>

          {/* Sort */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Ordenar:</span>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevância</SelectItem>
                <SelectItem value="newest">Novidades</SelectItem>
                <SelectItem value="price-asc">Menor Preço</SelectItem>
                <SelectItem value="price-desc">Maior Preço</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Grid Toggle */}
          <div className="hidden md:flex items-center gap-1 border border-border rounded-lg p-1">
            <button
              onClick={() => setGridCols(3)}
              className={`p-2 rounded ${gridCols === 3 ? 'bg-muted' : 'hover:bg-muted/50'}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`p-2 rounded ${gridCols === 4 ? 'bg-muted' : 'hover:bg-muted/50'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Active Filters Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            {activeCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm">
                {categories.find(c => c.slug === activeCategory)?.name}
                <button onClick={() => setSearchParams({})}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedSizes.map(size => (
              <span key={size} className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm">
                Tamanho: {size}
                <button onClick={() => toggleSize(size)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedColors.map(color => (
              <span key={color} className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm">
                {color}
                <button onClick={() => toggleColor(color)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {onlyPromo && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm">
                Em promoção
                <button onClick={() => setOnlyPromo(false)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterContent />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-4 md:gap-6 ${
                gridCols === 3 
                  ? 'grid-cols-2 md:grid-cols-3' 
                  : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
              }`}>
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">
                  Nenhum produto encontrado
                </p>
                <Button onClick={clearFilters}>
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Catalogo;
