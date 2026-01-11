import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import camisetaJesusKing from '@/assets/products/camiseta-jesus-king.png';
import camisetasVariedade from '@/assets/products/camisetas-variedade.png';
import camisetaPreta from '@/assets/products/camiseta-preta.png';
import camisetaVermelha from '@/assets/products/camiseta-vermelha.png';
import camisetaBranca from '@/assets/products/camiseta-branca.png';
import camisetaBege from '@/assets/products/camiseta-bege.png';

const instagramPosts = [
  { id: 1, image: camisetaJesusKing, likes: 234 },
  { id: 2, image: camisetasVariedade, likes: 189 },
  { id: 3, image: camisetaPreta, likes: 312 },
  { id: 4, image: camisetaVermelha, likes: 278 },
  { id: 5, image: camisetaBranca, likes: 156 },
  { id: 6, image: camisetaBege, likes: 203 },
];

const InstagramSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container-poly">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Instagram className="w-6 h-6 text-accent" />
            <span className="text-lg font-medium">@polyoutfits</span>
          </div>
          <h2 className="section-title">Siga nosso estilo</h2>
          <p className="section-subtitle mt-2 mx-auto">
            Inspire-se com nossos looks e compartilhe o seu
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href="https://instagram.com/polyoutfits"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-colors flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href="https://instagram.com/polyoutfits"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-accent text-accent font-medium rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Instagram className="w-5 h-5" />
            Seguir @polyoutfits
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramSection;
