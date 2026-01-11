import { useState, useEffect } from "react";
import {
  Truck,
  RefreshCw,
  Phone,
  Instagram,
  Shield,
  Tag,
  Package,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const benefits = [
  { icon: Truck, text: "Frete para todo Brasil" },
  { icon: RefreshCw, text: "Troca fácil em até 30 dias" },
  { icon: Shield, text: "Compra 100% segura" },
  { icon: Phone, text: "Atendimento via WhatsApp" },
];

const Topbar = () => {
  const [currentBenefit, setCurrentBenefit] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBenefit((prev) => (prev + 1) % benefits.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = benefits[currentBenefit].icon;

  return (
    <div className="topbar">
      <div className="container-poly">
        <div className="flex items-center justify-between min-h-[40px]">
          {/* DESKTOP */}
          <div className="hidden lg:flex items-center gap-6">
            {benefits.map((item, index) => (
              <span
                key={index}
                className="flex items-center gap-1.5 text-xs opacity-90"
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.text}
              </span>
            ))}
          </div>

          {/* MOBILE — BENEFÍCIO CENTRAL PREMIUM */}
          <div className="lg:hidden flex-1 flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBenefit}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex items-center gap-2 text-xs font-medium tracking-wide"
              >
                <CurrentIcon className="w-4 h-4 text-gold" />
                <span>{benefits[currentBenefit].text}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/conta/pedidos"
              className="flex items-center gap-1.5 hover:text-gold transition-colors text-xs"
            >
              <Package className="w-3.5 h-3.5" />
              Rastrear Pedido
            </Link>

            <span className="opacity-30">|</span>

            <a
              href="https://wa.me/559891002509"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-gold transition-colors text-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              (98) 9100-2509
            </a>

            <a
              href="https://instagram.com/polyoutfits"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-gold transition-colors text-xs"
            >
              <Instagram className="w-3.5 h-3.5" />
              @polyoutfits
            </a>
          </div>

          {/* PROMO — MOBILE E DESKTOP */}
          <Link
            to="/promocoes"
            className="ml-3 flex items-center gap-1.5 bg-gradient-to-r from-gold to-gold-dark text-navy px-3 py-1 rounded-full text-[11px] font-semibold shadow-gold hover:opacity-90 transition"
          >
            <Tag className="w-3 h-3" />
            <span className="hidden sm:inline">Até 50% OFF</span>
            <span className="sm:hidden">50% OFF</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;