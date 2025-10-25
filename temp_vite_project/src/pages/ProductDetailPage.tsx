import { ArrowLeft, Check, ShoppingCart, Star } from 'lucide-react';
import { useFirebase } from '../lib/firebase-context';
import { ProductCard } from '../components/ProductCard';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: string, productId?: string) => void;
}

export function ProductDetailPage({
  productId,
  onNavigate,
}: ProductDetailPageProps) {
  const { products } = useFirebase();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4">Товар не найден</h2>
          <Button onClick={() => onNavigate('products')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Вернуться к продукции
          </Button>
        </div>
      </div>
    );
  }

  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => onNavigate('products')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Вернуться к продукции
        </Button>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Product Image */}
          <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start gap-2 mb-4">
              <Badge variant="outline">{product.category}</Badge>
              {product.featured && <Badge variant="secondary">Хит</Badge>}
            </div>

            <h1 className="mb-4">{product.name}</h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-primary text-primary"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(24 отзыва)</span>
            </div>

            <div className="mb-6">
              <span className="text-4xl text-primary">
                {product.price.toFixed(0)} ₽
              </span>
            </div>

            <p className="text-lg mb-8">{product.description}</p>

            <div className="flex gap-4 mb-8">
              <Button size="lg" className="flex-1">
                <ShoppingCart className="mr-2 h-5 w-5" />
                В корзину
              </Button>
              <Button size="lg" variant="outline">
                Купить сейчас
              </Button>
            </div>

            <Separator className="mb-8" />

            {/* Product Features */}
            <div>
              <h5 className="mb-4">Преимущества продукта</h5>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Премиальные ингредиенты</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Научно обоснованная формула</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Протестировано на чистоту</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Подходит для ежедневного применения</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Гарантия качества</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Details Card */}
        <Card className="mb-20">
          <CardContent className="p-8">
            <h4 className="mb-4">Подробная информация</h4>
            <div className="prose max-w-none text-muted-foreground">
              <p>
                Этот премиальный продукт сочетает традиционные знания о травах с современными
                научными исследованиями для оптимальной пользы для здоровья. Каждая партия
                тщательно производится по строгим стандартам контроля качества для обеспечения
                стабильности и чистоты.
              </p>
              <p className="mt-4">
                <strong>Рекомендации по применению:</strong> Принимайте по назначению врача.
                Для достижения наилучших результатов используйте регулярно как часть
                сбалансированной программы для здоровья.
              </p>
              <p className="mt-4">
                <strong>Хранение:</strong> Хранить в прохладном, сухом месте вдали от прямых
                солнечных лучей. Хранить в недоступном для детей месте.
              </p>
              <p className="mt-4">
                <strong>Предупреждение:</strong> Проконсультируйтесь с врачом перед применением,
                если вы беременны, кормите грудью или принимаете какие-либо лекарства.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div>
            <h3 className="mb-8">Похожие товары</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onViewDetails={(id) => onNavigate('product', id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
