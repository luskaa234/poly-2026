import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/* =========================
   MENU CONFIG
========================= */
const navLinks = [
  { name: "Novidades", href: "/catalogo?filter=new" },
  {
    name: "Camisetas",
    href: "/catalogo?category=camisetas",
    submenu: [
      { name: "Todas", href: "/catalogo?category=camisetas" },
      { name: "Básicas", href: "/catalogo?category=camisetas&style=basica" },
      { name: "Estampadas", href: "/catalogo?category=camisetas&style=estampada" },
      { name: "Oversized", href: "/catalogo?category=camisetas&style=oversized" },
    ],
  },
  { name: "Calças", href: "/catalogo?category=calcas" },
  { name: "Acessórios", href: "/catalogo?category=acessorios" },
  { name: "Promoções", href: "/promocoes", highlight: true },
];

export default function Header() {
  const location = useLocation();
  const { totalItems, toggleCart } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  /* =========================
     EFFECTS
  ========================= */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
    setMobileSearchOpen(false);
    setOpenSubmenu(null);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    window.location.href = `/catalogo?search=${encodeURIComponent(searchQuery)}`;
  };

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(prev => (prev === name ? null : name));
  };

  /* =========================
     RENDER
  ========================= */
  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all ${
        isScrolled
          ? "bg-card/95 backdrop-blur-lg shadow-md"
          : "bg-card/90 backdrop-blur-md"
      }`}
    >
      <div className="container-poly">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* MOBILE MENU */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted"
          >
            <Menu />
          </button>

          {/* LOGO */}
          <Link to="/" className="font-serif text-xl lg:text-2xl font-semibold">
            Poly Outfits
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 ml-10">
            {navLinks.map(link =>
              link.submenu ? (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger className="px-4 py-2 flex items-center gap-1 nav-link">
                    {link.name}
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {link.submenu.map(s => (
                      <DropdownMenuItem key={s.name} asChild>
                        <Link to={s.href}>{s.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-2 nav-link ${
                    link.highlight ? "text-accent font-semibold" : ""
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-2">
            <button onClick={() => setIsSearchOpen(p => !p)}>
              {isSearchOpen ? <X /> : <Search />}
            </button>

            <Link to="/login" className="hidden sm:block">
              <User />
            </Link>

            <button onClick={toggleCart} className="relative">
              <ShoppingBag />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full px-1.5">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* DESKTOP SEARCH */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.form
              onSubmit={handleSearch}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="py-4"
            >
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos..."
                className="w-full max-w-2xl mx-auto block px-5 py-3 rounded-full bg-muted border"
              />
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* =========================
         MOBILE SIDEBAR
      ========================= */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[320px] p-0">
          <SheetHeader className="p-6 border-b">
            <SheetTitle className="font-serif text-xl">
              Poly Outfits
            </SheetTitle>
          </SheetHeader>

          <nav className="p-4 space-y-1">
            {/* MOBILE SEARCH */}
            <button
              onClick={() => setMobileSearchOpen(p => !p)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted"
            >
              <Search />
              Buscar
            </button>

            <AnimatePresence>
              {mobileSearchOpen && (
                <motion.form
                  onSubmit={handleSearch}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mb-2"
                >
                  <input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Buscar produtos..."
                    className="w-full px-4 py-3 rounded-lg bg-muted border"
                  />
                </motion.form>
              )}
            </AnimatePresence>

            {/* LINKS */}
            {navLinks.map(link => (
              <div key={link.name}>
                {link.submenu ? (
                  <button
                    onClick={() => toggleSubmenu(link.name)}
                    className={`w-full flex justify-between items-center px-4 py-3 rounded-lg hover:bg-muted ${
                      link.highlight ? "text-accent" : ""
                    }`}
                  >
                    {link.name}
                    <ChevronDown
                      className={`transition ${
                        openSubmenu === link.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg hover:bg-muted ${
                      link.highlight ? "text-accent font-semibold" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                )}

                <AnimatePresence>
                  {link.submenu && openSubmenu === link.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-4 mt-1 border-l pl-3 space-y-1"
                    >
                      {link.submenu.map(s => (
                        <Link
                          key={s.name}
                          to={s.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                          {s.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <div className="border-t my-4" />

            <Link
              to="/login"
              className="block px-4 py-3 rounded-lg hover:bg-muted"
            >
              Minha Conta
            </Link>
          </nav>

          <div className="p-4 border-t text-center text-sm">
            <p>Precisa de ajuda?</p>
            <a
              href="https://wa.me/559891002509"
              className="text-accent font-medium"
            >
              (98) 9100-2509
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}