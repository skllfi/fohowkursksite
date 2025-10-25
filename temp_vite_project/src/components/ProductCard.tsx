import { ShoppingCart } from 'lucide-react';
import { Product } from '../lib/product-data';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  product: Product;
  onViewDetails: (productId: string) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden bg-muted">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h5 className="line-clamp-1">{product.name}</h5>
          {product.featured && (
            <Badge variant="secondary" className="flex-shrink-0">
              Хит
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-primary">{product.price.toFixed(0)} ₽</span>
          <Badge variant="outline">{product.category}</Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onViewDetails(product.id)}
        >
          Подробнее
        </Button>
        <Button size="icon">
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
