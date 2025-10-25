import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground">F</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg tracking-tight">Fohow</span>
                <span className="text-xs text-muted-foreground">Курск</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Премиальная продукция для здоровья и благополучия.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="mb-4">Быстрые ссылки</h6>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Продукция
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Условия использования
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h6 className="mb-4">Контакты</h6>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>г. Курск, Россия</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>+7 (XXX) XXX-XX-XX</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>info@fohowkursk.ru</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Fohow Курск. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
