'use client';

import Link from 'next/link';
import { Product } from '@/lib/products';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface ProductGridProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

const basePath = '/fohowkursk';

export default function ProductGrid({ products, onProductSelect }: ProductGridProps) {
  return (
    <section>
      <div className="mb-8">
        <p className="text-center text-gray-700 max-w-3xl mx-auto">
          Нажмите на карточку продукта, чтобы открыть быстрое описание. Используйте фильтры для поиска.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className={`hover:shadow-xl transition-shadow duration-300 flex flex-col cursor-pointer overflow-hidden rounded-xl border-2 ${
              product.isFeatured ? 'border-primary' : 'border-transparent'
            }`}
            onClick={() => onProductSelect(product)}
          >
            {product.image && (
                <div className="relative w-full h-48">
                    <Image 
                      src={`${basePath}${product.image}`} 
                      alt={product.name} 
                      fill 
                      className="object-cover"
                      unoptimized
                    />
                    {product.isFeatured && (
                      <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground border-none shadow-lg">
                        Выгодно
                      </Badge>
                    )}
                </div>
            )}
            <CardHeader>
              <CardTitle className="text-lg">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-4">{product.summary}</p>
                <div className="mb-4">
                  {product.pricePerUnit && product.unitName ? (
                    <>
                      <p className="text-lg font-bold text-gray-800">{product.pricePerUnit} ₽ / {product.unitName}</p>
                      <p className="text-sm text-gray-600">
                        {product.price} ₽ за упаковку {product.details.packaging && `(${product.details.packaging})`}
                      </p>
                    </>
                  ) : (
                     <p className="text-lg font-bold text-gray-800">{product.price} ₽ {product.details.packaging && <span className="text-sm text-gray-600">({product.details.packaging})</span>}</p>
                  )}
                </div>
              </div>
              <Button
                variant="link"
                asChild
                className={`p-0 h-auto font-semibold self-start ${
                  product.isFeatured ? 'text-primary' : 'text-blue-600'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <Link href={`/products/${product.id}`}>
                  Расширенный просмотр →
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
