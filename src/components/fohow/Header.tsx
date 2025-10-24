
'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-primary transition-colors">
              Fohow Kursk
            </Link>
          </div>
          <nav>
            <ul className="flex items-center space-x-6">
              <li>
                <a
                  href="https://fohow.cc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                >
                  Официальный сайт Fohow
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
