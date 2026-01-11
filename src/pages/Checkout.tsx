import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, CreditCard, Landmark, QrCode, Truck, Package } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Input masks
const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .slice(0, 14);
};

const formatPhone = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15);
};

const formatCEP = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 9);
};

const formatCardNumber = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .slice(0, 19);
};

const formatCardExpiry = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .slice(0, 5);
};

const formatCVV = (value: string) => {
  return value.replace(/\D/g, '').slice(0, 4);
};

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Form states
  const [identification, setIdentification] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
  });

  const [address, setAddress] = useState({
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    reference: '',
  });

  const [shipping, setShipping] = useState('pac');
  const [paymentMethod, setPaymentMethod] = useState('pix');

  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    installments: '1',
  });

  const shippingOptions = {
    pac: { name: 'PAC', price: 18.90, days: '5 a 8 dias úteis' },
    sedex: { name: 'SEDEX', price: 32.90, days: '2 a 4 dias úteis' },
  };

  const shippingCost = shippingOptions[shipping as keyof typeof shippingOptions].price;
  const total = subtotal + shippingCost;

  const handleSubmit = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newOrderNumber = `POLY${Date.now().toString().slice(-8)}`;
    setOrderNumber(newOrderNumber);
    setOrderComplete(true);
    clearCart();
    
    toast({
      title: 'Pedido realizado com sucesso!',
      description: `Número do pedido: ${newOrderNumber}`,
    });
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <Layout>
        <div className="container-poly py-16 text-center">
          <h1 className="text-2xl font-serif mb-4">Seu carrinho está vazio</h1>
          <Button asChild>
            <a href="/catalogo">Continuar comprando</a>
          </Button>
        </div>
      </Layout>
    );
  }

  if (orderComplete) {
    return (
      <Layout>
        <div className="container-poly py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-serif font-medium mb-4">Pedido Realizado!</h1>
            <p className="text-muted-foreground mb-2">
              Obrigado pela sua compra. Seu pedido foi confirmado.
            </p>
            <p className="text-lg font-medium mb-6">
              Número do pedido: <span className="text-accent">{orderNumber}</span>
            </p>
            <div className="bg-muted p-4 rounded-lg mb-8 text-left">
              <h3 className="font-medium mb-2">Próximos passos:</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Você receberá um e-mail com os detalhes do pedido</li>
                <li>• Acompanhe o status pelo link enviado</li>
                <li>• Prazo de entrega: {shippingOptions[shipping as keyof typeof shippingOptions].days}</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <a href="/conta">Acompanhar Pedido</a>
              </Button>
              <Button asChild className="btn-gold">
                <a href="/catalogo">Continuar Comprando</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-poly py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= s
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 4 && (
                <div
                  className={`w-12 h-0.5 ${step > s ? 'bg-accent' : 'bg-muted'}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Identification */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card rounded-lg border border-border p-6"
              >
                <h2 className="font-serif text-xl font-medium mb-6">Identificação</h2>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      value={identification.name}
                      onChange={(e) => setIdentification({ ...identification, name: e.target.value })}
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={identification.email}
                      onChange={(e) => setIdentification({ ...identification, email: e.target.value })}
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        value={identification.cpf}
                        onChange={(e) => setIdentification({ ...identification, cpf: formatCPF(e.target.value) })}
                        placeholder="000.000.000-00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={identification.phone}
                        onChange={(e) => setIdentification({ ...identification, phone: formatPhone(e.target.value) })}
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>
                </div>
                <Button onClick={() => setStep(2)} className="mt-6 btn-gold">
                  Continuar
                </Button>
              </motion.div>
            )}

            {/* Step 2: Address */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card rounded-lg border border-border p-6"
              >
                <h2 className="font-serif text-xl font-medium mb-6">Endereço de Entrega</h2>
                <div className="grid gap-4">
                  <div className="sm:w-1/3">
                    <Label htmlFor="cep">CEP</Label>
                    <Input
                      id="cep"
                      value={address.cep}
                      onChange={(e) => setAddress({ ...address, cep: formatCEP(e.target.value) })}
                      placeholder="00000-000"
                    />
                  </div>
                  <div className="grid sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-3">
                      <Label htmlFor="street">Rua</Label>
                      <Input
                        id="street"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        placeholder="Nome da rua"
                      />
                    </div>
                    <div>
                      <Label htmlFor="number">Número</Label>
                      <Input
                        id="number"
                        value={address.number}
                        onChange={(e) => setAddress({ ...address, number: e.target.value })}
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="complement">Complemento (opcional)</Label>
                    <Input
                      id="complement"
                      value={address.complement}
                      onChange={(e) => setAddress({ ...address, complement: e.target.value })}
                      placeholder="Apto, bloco, etc."
                    />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="neighborhood">Bairro</Label>
                      <Input
                        id="neighborhood"
                        value={address.neighborhood}
                        onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
                        placeholder="Bairro"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        placeholder="Cidade"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">Estado</Label>
                      <Select
                        value={address.state}
                        onValueChange={(value) => setAddress({ ...address, state: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="UF" />
                        </SelectTrigger>
                        <SelectContent>
                          {['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'].map(uf => (
                            <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="reference">Ponto de referência (opcional)</Label>
                    <Input
                      id="reference"
                      value={address.reference}
                      onChange={(e) => setAddress({ ...address, reference: e.target.value })}
                      placeholder="Próximo a..."
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Voltar
                  </Button>
                  <Button onClick={() => setStep(3)} className="btn-gold">
                    Continuar
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Shipping */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card rounded-lg border border-border p-6"
              >
                <h2 className="font-serif text-xl font-medium mb-6">Entrega</h2>
                <RadioGroup value={shipping} onValueChange={setShipping}>
                  {Object.entries(shippingOptions).map(([key, option]) => (
                    <div
                      key={key}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer ${
                        shipping === key ? 'border-accent bg-accent/5' : 'border-border'
                      }`}
                      onClick={() => setShipping(key)}
                    >
                      <div className="flex items-center gap-4">
                        <RadioGroupItem value={key} id={key} />
                        <div>
                          <Label htmlFor={key} className="cursor-pointer font-medium">
                            {option.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">{option.days}</p>
                        </div>
                      </div>
                      <span className="font-semibold">{formatPrice(option.price)}</span>
                    </div>
                  ))}
                </RadioGroup>
                <div className="flex gap-4 mt-6">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Voltar
                  </Button>
                  <Button onClick={() => setStep(4)} className="btn-gold">
                    Continuar
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Payment */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card rounded-lg border border-border p-6"
              >
                <h2 className="font-serif text-xl font-medium mb-6">Pagamento</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  {/* Pix */}
                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer ${
                      paymentMethod === 'pix' ? 'border-accent bg-accent/5' : 'border-border'
                    }`}
                    onClick={() => setPaymentMethod('pix')}
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value="pix" id="pix" />
                      <QrCode className="w-6 h-6 text-accent" />
                      <div>
                        <Label htmlFor="pix" className="cursor-pointer font-medium">
                          Pix
                        </Label>
                        <p className="text-sm text-muted-foreground">Pagamento instantâneo</p>
                      </div>
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`p-4 rounded-lg border-2 ${
                      paymentMethod === 'card' ? 'border-accent bg-accent/5' : 'border-border'
                    }`}
                  >
                    <div
                      className="flex items-center gap-4 cursor-pointer"
                      onClick={() => setPaymentMethod('card')}
                    >
                      <RadioGroupItem value="card" id="card" />
                      <CreditCard className="w-6 h-6 text-accent" />
                      <div>
                        <Label htmlFor="card" className="cursor-pointer font-medium">
                          Cartão de Crédito
                        </Label>
                        <p className="text-sm text-muted-foreground">Parcele em até 12x</p>
                      </div>
                    </div>

                    {paymentMethod === 'card' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-border space-y-4"
                      >
                        <div>
                          <Label htmlFor="cardNumber">Número do cartão</Label>
                          <Input
                            id="cardNumber"
                            value={cardData.number}
                            onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                            placeholder="0000 0000 0000 0000"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardName">Nome no cartão</Label>
                          <Input
                            id="cardName"
                            value={cardData.name}
                            onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                            placeholder="NOME COMPLETO"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="cardExpiry">Validade</Label>
                            <Input
                              id="cardExpiry"
                              value={cardData.expiry}
                              onChange={(e) => setCardData({ ...cardData, expiry: formatCardExpiry(e.target.value) })}
                              placeholder="MM/AA"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cardCvv">CVV</Label>
                            <Input
                              id="cardCvv"
                              value={cardData.cvv}
                              onChange={(e) => setCardData({ ...cardData, cvv: formatCVV(e.target.value) })}
                              placeholder="000"
                            />
                          </div>
                          <div>
                            <Label htmlFor="installments">Parcelas</Label>
                            <Select
                              value={cardData.installments}
                              onValueChange={(value) => setCardData({ ...cardData, installments: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => (
                                  <SelectItem key={n} value={n.toString()}>
                                    {n}x de {formatPrice(total / n)} {n === 1 ? '' : 'sem juros'}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Boleto */}
                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer ${
                      paymentMethod === 'boleto' ? 'border-accent bg-accent/5' : 'border-border'
                    }`}
                    onClick={() => setPaymentMethod('boleto')}
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value="boleto" id="boleto" />
                      <Landmark className="w-6 h-6 text-accent" />
                      <div>
                        <Label htmlFor="boleto" className="cursor-pointer font-medium">
                          Boleto Bancário
                        </Label>
                        <p className="text-sm text-muted-foreground">Vencimento em 3 dias úteis</p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>

                <div className="flex gap-4 mt-6">
                  <Button variant="outline" onClick={() => setStep(3)}>
                    Voltar
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="btn-gold flex-1"
                  >
                    {isProcessing ? 'Processando...' : 'Confirmar Pedido'}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-lg border border-border p-6 space-y-4">
              <h2 className="font-serif text-xl font-medium">Resumo</h2>

              {/* Items */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                    className="flex gap-3"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.selectedColor} • {item.selectedSize} • Qtd: {item.quantity}
                      </p>
                      <p className="text-sm font-medium mt-1">
                        {formatPrice((item.product.promoPrice || item.product.price) * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete</span>
                  <span>{formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="font-medium">Total</span>
                  <span className="font-serif text-xl font-semibold">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Delivery Info */}
              {step >= 3 && (
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="w-4 h-4 text-accent" />
                    <span>{shippingOptions[shipping as keyof typeof shippingOptions].name}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">
                      {shippingOptions[shipping as keyof typeof shippingOptions].days}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
