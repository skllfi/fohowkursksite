import productsDataSource from '@/lib/products.json';
import ProductPageClient from '@/components/fohow/ProductPageClient';
import { notFound } from 'next/navigation';
import type { Product } from '@/lib/products';

export async function generateStaticParams() {
  return productsDataSource.products.map((product) => ({
    id: product.id,
  }));
}

function getProduct(id: string): Product | undefined {
  return productsDataSource.products.find((p: Product) => p.id === id);
}

type ProductPageProps = {
  params: {
    id: string;
  };
};

const ProductPage = ({ params }: ProductPageProps) => {
  const { id } = params;
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
};

export default ProductPage;
