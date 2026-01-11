import { Link } from 'react-router-dom';
import { Instagram, Phone, Mail, MapPin, CreditCard, Shield, Truck } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Trust Badges */}
      <div className="border-b border-navy-light">
        <div className="container-poly py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-navy-light flex items-center justify-center">
                <Truck className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-medium text-sm">Entrega Rápida</p>
                <p className="text-xs text-primary-foreground/70">Para todo Brasil</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-navy-light flex items-center justify-center">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-medium text-sm">Compra Segura</p>
                <p className="text-xs text-primary-foreground/70">Dados protegidos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-navy-light flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-medium text-sm">Parcelamento</p>
                <p className="text-xs text-primary-foreground/70">Em até 12x</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-navy-light flex items-center justify-center">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-medium text-sm">Suporte</p>
                <p className="text-xs text-primary-foreground/70">Via WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-poly py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={logo} alt="Poly Outfits" className="h-12 w-auto mb-4" />
            <p className="text-sm text-primary-foreground/80 mb-4">
              Moda streetwear com estilo e qualidade premium. Vista-se com atitude.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/polyoutfits"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Institucional */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Institucional</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/sobre" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link to="/localizacao" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  Localização
                </Link>
              </li>
              <li>
                <Link to="/trocas" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/termos" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          {/* Atendimento */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Atendimento</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-accent" />
                <div>
                  <p className="text-sm">(11) 99999-9999</p>
                  <p className="text-xs text-primary-foreground/60">WhatsApp</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-accent" />
                <div>
                  <p className="text-sm">contato@polyoutfits.com</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-accent" />
                <div>
                  <p className="text-sm">São Paulo, SP</p>
                  <p className="text-xs text-primary-foreground/60">Seg-Sex: 9h-18h</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Pagamentos */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Formas de Pagamento</h4>
            <div className="flex flex-wrap gap-2">
              <div className="px-3 py-2 bg-navy-light rounded text-xs font-medium">Pix</div>
              <div className="px-3 py-2 bg-navy-light rounded text-xs font-medium">Visa</div>
              <div className="px-3 py-2 bg-navy-light rounded text-xs font-medium">Mastercard</div>
              <div className="px-3 py-2 bg-navy-light rounded text-xs font-medium">Elo</div>
              <div className="px-3 py-2 bg-navy-light rounded text-xs font-medium">Boleto</div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-navy-light">
        <div className="container-poly py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-primary-foreground/60">
              © 2024 Poly Outfits. Todos os direitos reservados.
            </p>
            <Link
              to="/admin"
              className="text-xs text-primary-foreground/40 hover:text-primary-foreground/60 transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
