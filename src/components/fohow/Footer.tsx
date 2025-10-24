
'use client';

import { Phone, Send } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 mt-12">
      <div className="container mx-auto py-8 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Fohow Kursk
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Натуральные продукты для вашего здоровья и благополучия.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Контакты
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center justify-center md:justify-start">
                <Phone className="w-4 h-4 mr-2" />
                <a href="tel:+79102120898" className="hover:text-primary">
                  +7 910 212 0898
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Send className="w-4 h-4 mr-2" />
                <a
                  href="https://t.me/your_telegram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Информация
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <Link href="#" className="hover:text-primary">
                  О нас
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} Fohow Kursk.
          </p>
          <p className="mt-1">
            Информация на сайте не является публичной офертой. Проконсультируйтесь со специалистом.
          </p>
        </div>
      </div>
    </footer>
  );
}
