import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, Package, MapPin, Heart, LogOut, 
  ChevronRight, Edit2, Plus 
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data
const mockOrders = [
  { id: '001234', date: '15/12/2024', status: 'Entregue', total: 189.90, items: 2 },
  { id: '001198', date: '02/12/2024', status: 'Em trânsito', total: 299.80, items: 3 },
  { id: '001156', date: '20/11/2024', status: 'Entregue', total: 149.90, items: 1 },
];

const mockAddresses = [
  { id: 1, name: 'Casa', street: 'Rua das Flores, 123', city: 'São Paulo, SP', cep: '01310-100', default: true },
  { id: 2, name: 'Trabalho', street: 'Av. Paulista, 1000', city: 'São Paulo, SP', cep: '01311-000', default: false },
];

const Conta = () => {
  const [user] = useState({
    name: 'João Silva',
    email: 'joao@email.com',
  });

  return (
    <Layout>
      <div className="container-poly py-8 md:py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-10 h-10 text-accent" />
                </div>
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>

              <nav className="space-y-1">
                {[
                  { icon: User, label: 'Meus Dados', href: '#dados' },
                  { icon: Package, label: 'Meus Pedidos', href: '#pedidos' },
                  { icon: MapPin, label: 'Endereços', href: '#enderecos' },
                  { icon: Heart, label: 'Favoritos', href: '/conta/favoritos' },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
                  </a>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-border">
                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                  <LogOut className="w-5 h-5 mr-3" />
                  Sair da conta
                </Button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <Tabs defaultValue="pedidos" className="w-full">
              <TabsList className="w-full justify-start mb-6 bg-transparent border-b border-border rounded-none p-0 h-auto">
                <TabsTrigger value="dados" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent">
                  Meus Dados
                </TabsTrigger>
                <TabsTrigger value="pedidos" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent">
                  Meus Pedidos
                </TabsTrigger>
                <TabsTrigger value="enderecos" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent">
                  Endereços
                </TabsTrigger>
              </TabsList>

              {/* My Data */}
              <TabsContent value="dados">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Informações Pessoais</h3>
                    <Button variant="outline" size="sm">
                      <Edit2 className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-muted-foreground">Nome completo</label>
                      <p className="font-medium">{user.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">E-mail</label>
                      <p className="font-medium">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">CPF</label>
                      <p className="font-medium">***.***.***-00</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Telefone</label>
                      <p className="font-medium">(11) 99999-9999</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <h4 className="font-medium mb-4">Segurança</h4>
                    <Button variant="outline">Alterar senha</Button>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Orders */}
              <TabsContent value="pedidos">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {mockOrders.map((order) => (
                    <div 
                      key={order.id}
                      className="bg-card border border-border rounded-xl p-5 hover:border-accent/50 transition-colors"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <p className="font-semibold">Pedido #{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date} • {order.items} itens</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Entregue' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status}
                          </span>
                          <p className="font-semibold mt-1">R$ {order.total.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-border flex gap-3">
                        <Button variant="outline" size="sm">Ver detalhes</Button>
                        {order.status === 'Entregue' && (
                          <Button variant="outline" size="sm">Comprar novamente</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </TabsContent>

              {/* Addresses */}
              <TabsContent value="enderecos">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <Button className="w-full sm:w-auto mb-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar endereço
                  </Button>

                  {mockAddresses.map((address) => (
                    <div 
                      key={address.id}
                      className={`bg-card border rounded-xl p-5 ${
                        address.default ? 'border-accent' : 'border-border'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{address.name}</h4>
                            {address.default && (
                              <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                                Padrão
                              </span>
                            )}
                          </div>
                          <p className="text-muted-foreground">{address.street}</p>
                          <p className="text-muted-foreground">{address.city} - {address.cep}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Conta;
