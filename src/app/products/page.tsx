'use client';

import { Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { products } from '@/lib/product-data';
import { ProductCard } from '@/components/fohow/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map((p) => p.category));
    return ['Все', ...Array.from(uniqueCategories)];
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'Все' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="mb-4">Наша продукция</h1>
          <p className="text-lg text-muted-foreground">
            Изучите наш полный ассортимент премиальной продукции для здоровья и благополучия
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск продукции..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <>
            <div className="mb-6 text-sm text-muted-foreground">
              Показано {filteredProducts.length} {filteredProducts.length === 1 ? 'товар' : filteredProducts.length < 5 ? 'товара' : 'товаров'}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">
              Товары не найдены по заданным критериям.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Все');
              }}
            >
              Очистить фильтры
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
