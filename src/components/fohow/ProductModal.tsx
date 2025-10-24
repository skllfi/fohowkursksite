'use client';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Product } from '@/lib/products';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const basePath = '/fohowkursk';

export default function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-gray-700 mt-4">
          {product.image && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image 
                src={`${basePath}${product.image}`} 
                alt={product.name} 
                fill 
                className="object-cover"
                unoptimized
              />
            </div>
          )}
          <div>
            {product.pricePerUnit && product.unitName ? (
              <>
                <strong className="text-xl font-bold text-gray-900">{product.pricePerUnit} ₽ / {product.unitName}</strong>
                <span className="text-md text-gray-600 ml-2">
                  ({product.price} ₽ за упаковку {product.details.packaging && ` - ${product.details.packaging}`})
                </span>
              </>
            ) : (
              <strong className="text-xl font-bold text-gray-900">{product.price} ₽ {product.details.packaging && <span className="text-md text-gray-600 ml-2">({product.details.packaging})</span>}</strong>
            )}
          </div>
          <Separator />
          <div>
            <p className="italic text-gray-600">{product.summary}</p>
          </div>
          <Separator />
          <div>
            <strong className="font-semibold text-gray-900">Состав:</strong>{' '}
            {product.details.composition}
          </div>
          <Separator />
          <div>
            <strong className="font-semibold text-gray-900">
              Ключевое действие:
            </strong>{' '}
            {product.details.action}
          </div>
          <Separator />
          <div>
            <strong className="font-semibold text-gray-900">
              Применение:
            </strong>{' '}
            {product.details.application}
          </div>
          {product.details.contraindication && (
            <>
              <Separator />
              <div>
                <strong className="font-semibold text-gray-900">
                  Противопоказания:
                </strong>{' '}
                {product.details.contraindication}
              </div>
            </>
          )}
        </div>
        <DialogFooter className="pt-4">
          <Button asChild variant={product.isFeatured ? 'default' : 'secondary'}>
            <Link href={`/products/${product.id}`}>
              Перейти на страницу продукта <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
