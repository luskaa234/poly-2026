import camisetaJesusKing from '@/assets/products/camiseta-jesus-king.png';
import camisetaVermelha from '@/assets/products/camiseta-vermelha.png';
import camisetaPreta from '@/assets/products/camiseta-preta.png';
import camisetaBranca from '@/assets/products/camiseta-branca.png';
import camisetaMarrom from '@/assets/products/camiseta-marrom.png';
import camisetaBege from '@/assets/products/camiseta-bege.png';
import camisetasVariedade from '@/assets/products/camisetas-variedade.png';

/* =========================
   TIPAGENS
========================= */
export interface ProductColor {
  name: string;
  hex: string;
  available: boolean;
}

export interface ProductSize {
  name: string;
  available: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  promoPrice?: number;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  stockByVariant: Record<string, number>;
  description: string;
  material: string;
  care: string;
  category: 'camisetas' | 'calcas' | 'acessorios' | 'kits';
  featured: boolean;
  isNew: boolean;
  videoUrl?: string;
}

/* =========================
   CATEGORIAS (EXPORT CORRETO)
========================= */
export const categories = [
  { id: 'all', name: 'Todos', slug: 'all' },
  { id: 'camisetas', name: 'Camisetas', slug: 'camisetas' },
  { id: 'calcas', name: 'Calças', slug: 'calcas' },
  { id: 'acessorios', name: 'Acessórios', slug: 'acessorios' },
  { id: 'kits', name: 'Kits', slug: 'kits' },
];

/* =========================
   PRODUTOS
========================= */
export const products: Product[] = [
  /* =========================
     CAMISETAS BÁSICAS (2)
  ========================= */
  {
    id: '1',
    name: 'Camiseta Básica Premium Preta',
    slug: 'camiseta-basica-preta',
    price: 89.9,
    images: [camisetaPreta],
    colors: [{ name: 'Preto', hex: '#1a1a1a', available: true }],
    sizes: [
      { name: 'P', available: true },
      { name: 'M', available: true },
      { name: 'G', available: true },
    ],
    stockByVariant: { 'Preto-M': 10 },
    description: 'Camiseta básica preta com caimento premium.',
    material: 'Algodão Premium 160g',
    care: 'Lavar à máquina.',
    category: 'camisetas',
    featured: true,
    isNew: false,
  },
  {
    id: '2',
    name: 'Camiseta Básica Premium Bege',
    slug: 'camiseta-basica-bege',
    price: 89.9,
    images: [camisetaBege],
    colors: [{ name: 'Bege', hex: '#E8DCC4', available: true }],
    sizes: [
      { name: 'P', available: true },
      { name: 'M', available: true },
      { name: 'G', available: true },
    ],
    stockByVariant: { 'Bege-M': 8 },
    description: 'Básica premium em tom neutro sofisticado.',
    material: 'Algodão Premium 160g',
    care: 'Lavar à máquina.',
    category: 'camisetas',
    featured: false,
    isNew: true,
  },

  /* =========================
     CAMISETAS ESTAMPADAS (2)
  ========================= */
  {
    id: '3',
    name: 'Camiseta Estampada Jesus Is King',
    slug: 'camiseta-estampada-jesus-is-king',
    price: 159.9,
    promoPrice: 129.9,
    images: [camisetaJesusKing],
    colors: [{ name: 'Marrom', hex: '#8B6F5C', available: true }],
    sizes: [
      { name: 'M', available: true },
      { name: 'G', available: true },
      { name: 'GG', available: true },
    ],
    stockByVariant: { 'Marrom-G': 6 },
    description: 'Estampa exclusiva com identidade street.',
    material: 'Algodão Premium 180g',
    care: 'Lavar à máquina.',
    category: 'camisetas',
    featured: true,
    isNew: true,
  },
  {
    id: '4',
    name: 'Camiseta Estampada Cross Street',
    slug: 'camiseta-estampada-cross-street',
    price: 119.9,
    images: [camisetaBranca],
    colors: [{ name: 'Branco', hex: '#ffffff', available: true }],
    sizes: [
      { name: 'P', available: true },
      { name: 'M', available: true },
      { name: 'G', available: true },
    ],
    stockByVariant: { 'Branco-M': 5 },
    description: 'Visual urbano com estampa minimal.',
    material: 'Algodão Premium 170g',
    care: 'Lavar à máquina.',
    category: 'camisetas',
    featured: false,
    isNew: true,
  },

  /* =========================
     CAMISETAS OVERSIZED (2)
  ========================= */
  {
    id: '5',
    name: 'Camiseta Oversized Urban Black',
    slug: 'camiseta-oversized-urban-black',
    price: 139.9,
    images: [camisetaPreta],
    colors: [{ name: 'Preto', hex: '#1a1a1a', available: true }],
    sizes: [
      { name: 'G', available: true },
      { name: 'GG', available: true },
      { name: 'XG', available: true },
    ],
    stockByVariant: { 'Preto-GG': 7 },
    description: 'Oversized premium com caimento largo.',
    material: 'Algodão Premium 180g',
    care: 'Lavar à máquina.',
    category: 'camisetas',
    featured: true,
    isNew: true,
  },
  {
    id: '6',
    name: 'Camiseta Oversized Earth Tone',
    slug: 'camiseta-oversized-earth-tone',
    price: 139.9,
    images: [camisetaMarrom],
    colors: [{ name: 'Marrom', hex: '#8B6F5C', available: true }],
    sizes: [
      { name: 'G', available: true },
      { name: 'GG', available: true },
    ],
    stockByVariant: { 'Marrom-G': 6 },
    description: 'Oversized com identidade premium.',
    material: 'Algodão Premium 180g',
    care: 'Lavar à máquina.',
    category: 'camisetas',
    featured: false,
    isNew: false,
  },

  /* =========================
     CALÇAS (3)
  ========================= */
  {
    id: '7',
    name: 'Calça Cargo Street Premium',
    slug: 'calca-cargo-street',
    price: 229.9,
    images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246'],
    colors: [{ name: 'Preto', hex: '#1a1a1a', available: true }],
    sizes: [{ name: 'G', available: true }],
    stockByVariant: { 'Preto-G': 6 },
    description: 'Calça cargo streetwear.',
    material: 'Algodão + Elastano',
    care: 'Lavar à mão.',
    category: 'calcas',
    featured: true,
    isNew: true,
  },
  {
    id: '8',
    name: 'Calça Slim Casual',
    slug: 'calca-slim-casual',
    price: 199.9,
    images: ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f'],
    colors: [{ name: 'Bege', hex: '#E8DCC4', available: true }],
    sizes: [{ name: 'M', available: true }],
    stockByVariant: { 'Bege-M': 8 },
    description: 'Calça slim moderna.',
    material: 'Algodão Premium',
    care: 'Lavar à máquina.',
    category: 'calcas',
    featured: false,
    isNew: false,
  },
  {
    id: '9',
    name: 'Calça Jogger Urban',
    slug: 'calca-jogger-urban',
    price: 189.9,
    images: ['https://images.unsplash.com/photo-1593032465171-bfa53b9f1f9d'],
    colors: [{ name: 'Cinza', hex: '#9CA3AF', available: true }],
    sizes: [{ name: 'G', available: true }],
    stockByVariant: { 'Cinza-G': 5 },
    description: 'Jogger confortável urbana.',
    material: 'Moletom Premium',
    care: 'Secar à sombra.',
    category: 'calcas',
    featured: false,
    isNew: true,
  },

  /* =========================
     ACESSÓRIOS (3)
  ========================= */
  {
    id: '10',
    name: 'Boné Minimal Premium',
    slug: 'bone-minimal',
    price: 79.9,
    images: ['https://images.unsplash.com/photo-1523381294911-8d3cead13475'],
    colors: [{ name: 'Preto', hex: '#1a1a1a', available: true }],
    sizes: [{ name: 'Único', available: true }],
    stockByVariant: { 'Preto-Único': 20 },
    description: 'Boné street premium.',
    material: 'Algodão',
    care: 'Limpeza manual.',
    category: 'acessorios',
    featured: true,
    isNew: true,
  },
  {
    id: '11',
    name: 'Corrente Aço Inox',
    slug: 'corrente-aco-inox',
    price: 99.9,
    images: ['https://images.unsplash.com/photo-1600180758890-6b94519a8ba6'],
    colors: [{ name: 'Prata', hex: '#D1D5DB', available: true }],
    sizes: [{ name: 'Único', available: true }],
    stockByVariant: { 'Prata-Único': 10 },
    description: 'Corrente urbana resistente.',
    material: 'Aço Inoxidável',
    care: 'Evitar químicos.',
    category: 'acessorios',
    featured: false,
    isNew: false,
  },
  {
    id: '12',
    name: 'Mochila Streetwear',
    slug: 'mochila-streetwear',
    price: 159.9,
    images: ['https://images.unsplash.com/photo-1585386959984-a41552231693'],
    colors: [{ name: 'Preto', hex: '#1a1a1a', available: true }],
    sizes: [{ name: 'Único', available: true }],
    stockByVariant: { 'Preto-Único': 6 },
    description: 'Mochila funcional urbana.',
    material: 'Poliéster',
    care: 'Pano úmido.',
    category: 'acessorios',
    featured: true,
    isNew: true,
  },

  /* =========================
     KITS (3)
  ========================= */
  {
    id: '13',
    name: 'Kit 5 Camisetas Básicas',
    slug: 'kit-5-camisetas',
    price: 449.5,
    promoPrice: 349.9,
    images: [camisetasVariedade],
    colors: [{ name: 'Variado', hex: '#888888', available: true }],
    sizes: [{ name: 'M', available: true }],
    stockByVariant: { 'Variado-M': 5 },
    description: 'Kit econômico premium.',
    material: 'Algodão Premium',
    care: 'Lavar à máquina.',
    category: 'kits',
    featured: true,
    isNew: true,
  },
  {
    id: '14',
    name: 'Kit Street Completo',
    slug: 'kit-street-completo',
    price: 599.9,
    promoPrice: 499.9,
    images: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f'],
    colors: [{ name: 'Variado', hex: '#888888', available: true }],
    sizes: [{ name: 'G', available: true }],
    stockByVariant: { 'Variado-G': 3 },
    description: 'Look street completo.',
    material: 'Mix Premium',
    care: 'Ver etiquetas.',
    category: 'kits',
    featured: true,
    isNew: false,
  },
  {
    id: '15',
    name: 'Kit Essencial Premium',
    slug: 'kit-essencial-premium',
    price: 499.9,
    images: ['https://images.unsplash.com/photo-1516822003754-cca485356ecb'],
    colors: [{ name: 'Variado', hex: '#888888', available: true }],
    sizes: [{ name: 'M', available: true }],
    stockByVariant: { 'Variado-M': 4 },
    description: 'Kit essencial diário.',
    material: 'Algodão Premium',
    care: 'Lavar à máquina.',
    category: 'kits',
    featured: false,
    isNew: false,
  },
];

/* =========================
   FUNÇÕES AUXILIARES
========================= */
export const getProductBySlug = (slug: string) =>
  products.find(p => p.slug === slug);

export const getFeaturedProducts = () =>
  products.filter(p => p.featured);

export const getNewProducts = () =>
  products.filter(p => p.isNew);

export const getPromoProducts = () =>
  products.filter(p => p.promoPrice);

export const getProductsByCategory = (category?: string) => {
  if (!category || category === 'all') return products;
  return products.filter(p => p.category === category);
};

export const formatPrice = (price: number) =>
  price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

export const calculateDiscount = (price: number, promoPrice: number) =>
  Math.round(((price - promoPrice) / price) * 100);