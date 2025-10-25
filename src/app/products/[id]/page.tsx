'use client';

import { products } from '@/lib/product-data';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Product Details */}
          <div>
            <Link href="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors mb-4 inline-block">
              &larr; Назад к товарам
            </Link>
            <h1 className="mb-4">{product.name}</h1>
            <p className="text-3xl text-primary mb-6">{product.price.toFixed(0)} ₽</p>
            <p className="text-muted-foreground mb-8">{product.description}</p>

            <div className="flex flex-col gap-4">
                <Button size="lg">Добавить в корзину</Button>
                <Button size="lg" variant="outline">Купить в 1 клик</Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
