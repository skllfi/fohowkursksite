'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ArrowLeft,
  HeartPulse,
  AlertCircle,
  Sparkles,
  FileText,
  Package,
  Clock,
  Warehouse,
  Syringe,
  CheckCircle,
  Info,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/lib/products';
import Image from 'next/image';

const basePath = '/fohowkursk';

export default function ProductPageClient({ product }: { product: Product }) {
  const detailExists = (detail: any) => detail && detail !== "Прямые данные отсутствуют.";

  const categoryLabels: { [key: string]: string } = {
    bioregulation: 'Регуляция',
    detox: 'Очистка',
    restoration: 'Восстановление',
    cosmetics: 'Косметика',
    hygiene: 'Гигиена',
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-8">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад к каталогу
            </Link>
          </Button>
        </div>

        <main>
          <Card className="overflow-hidden mb-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="p-6 md:p-8 flex flex-col h-full">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-3xl md:text-4xl font-bold">
                    {product.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-0 flex-grow">
                  <p className="text-lg md:text-xl text-gray-600">
                    {product.summary}
                  </p>
                  <div className="my-4">
                    {product.pricePerUnit && product.unitName ? (
                      <>
                        <span className="text-3xl font-bold text-gray-900">{product.pricePerUnit} ₽ / {product.unitName}</span>
                        <span className="text-xl text-gray-600 ml-2">
                           ({product.price} ₽ за упаковку)
                        </span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-gray-900">{product.price} ₽</span>
                    )}
                  </div>
                  <Badge variant="secondary">{categoryLabels[product.category] || product.category}</Badge>
                </CardContent>
              </div>
              <div className="relative w-full h-96 p-8">
                {product.image && (
                  <div className="relative w-full max-w-md mx-auto h-full">
                    <Image
                      src={`${basePath}${product.image}`}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                      unoptimized
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
             {detailExists(product.details.packaging) && <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Package className="text-primary" />
                  <span>Упаковка</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{product.details.packaging}</p>
              </CardContent>
            </Card>}
            {detailExists(product.details.shelfLife) && <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Clock className="text-primary" />
                  <span>Срок годности</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{product.details.shelfLife}</p>
              </CardContent>
            </Card>}
            {detailExists(product.details.storage) && <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Warehouse className="text-primary" />
                  <span>Условия хранения</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{product.details.storage}</p>
              </CardContent>
            </Card>}
          </div>

          {detailExists(product.details.effects) && <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CheckCircle className="text-green-500" />
                  <span>Заявленные эффекты</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{product.details.effects}</p>
              </CardContent>
            </Card>}

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {detailExists(product.details.action) && <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <HeartPulse className="text-primary" />
                  <span>Показания</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{product.details.action}</p>              </CardContent>
            </Card>}
            {detailExists(product.details.contraindication) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <AlertCircle className="text-destructive" />
                    <span>Противопоказания</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-gray-700">
                  <p>{product.details.contraindication}</p>
                </CardContent>
              </Card>
            )}
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Подробная информация</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {detailExists(product.details.composition) && <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <Sparkles className="mr-2" /> Состав
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>{product.details.composition}</p>
                  </AccordionContent>
                </AccordionItem>}
                {detailExists(product.details.application) && <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <FileText className="mr-2" /> Способ применения
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>{product.details.application}</p>
                  </AccordionContent>
                </AccordionItem>}
                {detailExists(product.details.dosage) && <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <Syringe className="mr-2" /> Доза/Курс
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>{product.details.dosage}</p>
                  </AccordionContent>
                </AccordionItem>}
              </Accordion>
            </CardContent>
          </Card>
          
          {detailExists(product.details.note) && <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Info className="text-yellow-500" />
                  <span>Примечание</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{product.details.note}</p>
              </CardContent>
            </Card>}
        </main>
      </div>
    </div>
  );
}
