import { useState } from 'react';
import { ThemeProvider } from './lib/theme-context';
import { FirebaseProvider } from './lib/firebase-context';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ContactsPage } from './pages/ContactsPage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleNavigate = (page: string, productId?: string) => {
    setCurrentPage(page);
    if (productId) {
      setSelectedProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'products':
        return <ProductsPage onNavigate={handleNavigate} />;
      case 'product':
        return (
          <ProductDetailPage
            productId={selectedProductId || '1'}
            onNavigate={handleNavigate}
          />
        );
      case 'contacts':
        return <ContactsPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <FirebaseProvider>
        <div className="flex flex-col min-h-screen">
          <Header currentPage={currentPage} onNavigate={handleNavigate} />
          <main className="flex-1">{renderPage()}</main>
          <Footer />
        </div>
      </FirebaseProvider>
    </ThemeProvider>
  );
}
