import { ArrowRight, Heart, Shield, Truck } from 'lucide-react';
import { useFirebase } from '../lib/firebase-context';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: string, productId?: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { products, loading } = useFirebase();
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="mb-6">
                Натуральная продукция для здоровья и благополучия
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Откройте для себя премиальные БАДы и продукцию для здоровья от Fohow. 
                Традиционная мудрость встречается с современной наукой для вашего благополучия.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => onNavigate('products')}>
                  Смотреть продукцию
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => onNavigate('contacts')}>
                  Связаться с нами
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1713434638446-13b4a15b728e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzcyUyMHByb2R1Y3RzfGVufDF8fHx8MTc2MTM0Mjc3MXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Продукция для здоровья"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="mb-4">Почему выбирают Fohow?</h2>
            <p className="text-muted-foreground">
              Мы предоставляем продукцию высочайшего качества, основанную на традиционных 
              знаниях и современных исследованиях.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h5 className="mb-2">Премиум качество</h5>
                <p className="text-sm text-muted-foreground">
                  Все продукты сертифицированы и протестированы на чистоту и эффективность.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h5 className="mb-2">Натуральные ингредиенты</h5>
                <p className="text-sm text-muted-foreground">
                  Природные компоненты с традиционными формулами для оптимального здоровья.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h5 className="mb-2">Быстрая доставка</h5>
                <p className="text-sm text-muted-foreground">
                  Надежная доставка по всей России и за её пределами.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="mb-2">Популярная продукция</h2>
              <p className="text-muted-foreground">
                Откройте для себя наши самые популярные продукты для здоровья
              </p>
            </div>
            <Button variant="outline" onClick={() => onNavigate('products')}>
              Смотреть всё
            </Button>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Загрузка товаров...</p>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Популярные товары пока не добавлены</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={(id) => onNavigate('product', id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-primary-foreground">
            Начните ваш путь к здоровью сегодня
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Присоединяйтесь к тысячам довольных клиентов, которые улучшили своё здоровье 
            с премиальной продукцией Fohow.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => onNavigate('products')}
            >
              Смотреть продукцию
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={() => onNavigate('contacts')}
            >
              Связаться с нами
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
