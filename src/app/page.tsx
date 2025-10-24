'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/products';
import productsDataSource from '@/lib/products.json';
import ProductGrid from '@/components/fohow/ProductGrid';
import HealthPrograms from '@/components/fohow/HealthPrograms';
import ProductModal from '@/components/fohow/ProductModal';
import Footer from '@/components/fohow/Footer';

type Tab = 'deals' | 'products' | 'programs';

const categoryLabels: { [key: string]: string } = {
  bioregulation: 'Регуляция',
  detox: 'Очистка',
  restoration: 'Восстановление',
  cosmetics: 'Косметика',
  hygiene: 'Гигиена',
};

const allProducts: Product[] = productsDataSource.products;

const allFilters = [
  { label: 'Все', value: 'all' },
  ...Array.from(new Set(allProducts.map((p) => p.category))).map(
    (category) => ({
      label: categoryLabels[category] || category,
      value: category,
    })
  ),
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('deals');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setActiveFilter('all'); // Сбрасываем фильтр при смене вкладки
  };

  const currentProducts = useMemo(() => {
    let baseProducts;
    switch (activeTab) {
      case 'deals':
        baseProducts = allProducts.filter((p) => p.isFeatured);
        break;
      case 'products':
        baseProducts = allProducts;
        break;
      default:
        return [];
    }

    if (activeFilter === 'all') {
      return baseProducts;
    }
    return baseProducts.filter((p) => p.category === activeFilter);
  }, [activeTab, activeFilter]);


  const currentFilters = useMemo(() => {
    if (activeTab === 'products') {
      return allFilters;
    }
    if (activeTab === 'deals') {
      const featuredProducts = allProducts.filter(p => p.isFeatured);
      const featuredCategories = new Set(featuredProducts.map(p => p.category));
      return [
        { label: 'Все', value: 'all' },
        ...Array.from(featuredCategories).map(category => ({
          label: categoryLabels[category] || category,
          value: category,
        }))
      ];
    }
    return [];
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'deals':
      case 'products':
        return (
          <ProductGrid
            products={currentProducts}
            onProductSelect={setSelectedProduct}
          />
        );
      case 'programs':
        return <HealthPrograms />;
      default:
        return null;
    }
  };

  const TabButton = ({
    tab,
    label,
    isFeatured = false,
  }: {
    tab: Tab;
    label: string;
    isFeatured?: boolean;
  }) => (
    <Button
      onClick={() => handleTabChange(tab)}
      className={`rounded-full px-6 py-2 text-sm md:text-base font-medium border-2 transition-all duration-300 ${
        activeTab === tab
          ? isFeatured
            ? 'bg-primary text-primary-foreground border-primary-foreground/50 shadow-lg scale-105'
            : 'bg-primary text-primary-foreground border-primary-foreground/50 shadow-md'
          : isFeatured
          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-transparent'
          : 'bg-white text-gray-700 hover:bg-gray-100 border-transparent'
      }`}
    >
      {label}
    </Button>
  );
  
  const FilterButton = ({ label, value }: { label: string; value: string }) => (
    <Button
      key={value}
      variant={activeFilter === value ? 'default' : 'outline'}
      onClick={() => setActiveFilter(value)}
      className={`rounded-full px-4 py-2 text-sm transition-all duration-200 ${
        activeFilter === value
          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
          : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
    >
      {label}
    </Button>
  );

  return (
    <div className="bg-[#FDFBF8] text-gray-800">
      <div className="container mx-auto p-4 md:p-8">
        <nav className="flex justify-center items-center space-x-2 md:space-x-4 my-8 bg-white p-2 rounded-full shadow-sm max-w-lg mx-auto">
          <TabButton tab="deals" label="🔥 Сейчас выгодно" isFeatured={true} />
          <TabButton tab="products" label="Обзор Продукции" />
          <TabButton tab="programs" label="Программы" />
        </nav>

        {(activeTab === 'products' || activeTab === 'deals') && currentFilters.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {currentFilters.map((filter) => (
                <FilterButton key={filter.value} label={filter.label} value={filter.value} />
              ))}
            </div>
        )}

        <main>{renderContent()}</main>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <Footer />
    </div>
  );
}
