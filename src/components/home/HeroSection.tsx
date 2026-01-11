import { Link } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative w-full">
      <Link to="/catalogo">
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: "4 / 1",
            maxHeight: "600px",
          }}
        >
          <img
            src={heroBanner}
            alt="Nova Coleção Poly Outfits"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </div>
      </Link>
    </section>
  );
};

export default HeroSection;