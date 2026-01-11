import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Camisetas",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRfJS-tC4d0gXovfuQMYUVhqnqpPDzVV2X9ieJC0elVGGa4Jcud7kgdr5saAp1MkcDl2AZOAvc1S_cooXiA4A98kNfn7bBaF2PXnrr82zXe1O4&usqp=CAc",
    href: "/catalogo?category=camisetas",
  },
  {
    name: "Básicas",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS6Bof8syqNxaxXczwDue9y1UbGgh2i50NrFesAfqOHb5vnxpGnV9qbJ6oiO8LIOj7jpzaQfo5TnTVoH1JpPfDt6jE-d6ZKOn779DKWvRs_Rw&usqp=CAc",
    href: "/catalogo?category=camisetas&style=basica",
  },
  {
    name: "Oversized",
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSsJ3lJGko8IAY-MU9WSkrxPhmiYbzBJxc1u8ioeaW6Sy3J6NoplXfOkAUc3-Ag-vTsgnMmPtM4&usqp=CAc",
    href: "/catalogo?category=camisetas&style=oversized",
  },
  {
    name: "Estampadas",
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR_B6L0uTmq2GyuFvk8NrhVTJktH5d_GZIc_kgjRGcUe7oBNLP6bzIUNQHMBkt42t2AVw4UIZo9&usqp=CAc",
    href: "/catalogo?category=camisetas&style=estampada",
  },
  {
    name: "Kits",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQiTLJjMyWcSomjGRGOb4ddYoNtt0NcL77qtyuo5BJprX-tsMlpVfXoijDv7fwm3B9dKTPXnti_Cw&usqp=CAc",
    href: "/catalogo?category=kits",
  },
  {
    name: "Promoções",
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQleWnhrFYIy2P5g8atzd2urEg3rUEwu8mc0sQLtBZdwKsvHBuj0Jkt5NqSiCarcQZQ81pWqT4Zg3UUsuF93FhiPMJJ65zBsU0AQZm6emsC&usqp=CAc",
    href: "/promocoes",
  },
];

const CategoryCircles = () => {
  return (
    <section className="bg-background pt-6 pb-2">
      <div className="container-poly">
        <div className="flex justify-between gap-6 overflow-x-auto scrollbar-hide">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex-shrink-0 text-center"
            >
              <Link to={cat.href} className="group">
                <div className="w-28 h-28 rounded-full overflow-hidden border border-border shadow-sm group-hover:shadow-md transition">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <span className="block mt-3 text-sm font-medium">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCircles;