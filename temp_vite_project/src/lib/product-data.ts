export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Кордицепс Китайский',
    description: 'Премиальный экстракт кордицепса для жизненной энергии и силы. Натуральная поддержка иммунитета.',
    price: 6990,
    category: 'БАДы',
    image: 'https://images.unsplash.com/photo-1713434638446-13b4a15b728e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzcyUyMHByb2R1Y3RzfGVufDF8fHx8MTc2MTM0Mjc3MXww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
  },
  {
    id: '2',
    name: 'Споровое масло Линчжи',
    description: 'Высококачественное масло спор гриба Рейши в капсулах для иммунитета и здоровья.',
    price: 9990,
    category: 'БАДы',
    image: 'https://images.unsplash.com/photo-1760307837671-63ee641f9f1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjBtZWRpY2luZSUyMGJvdHRsZXN8ZW58MXx8fHwxNzYxMzQyNzcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
  },
  {
    id: '3',
    name: 'Масло облепихи',
    description: 'Богато омега жирными кислотами и витаминами. Поддерживает здоровье сердца и кожи.',
    price: 5490,
    category: 'Масла',
    image: 'https://images.unsplash.com/photo-1618322704514-b2e39eadd2d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoZWFsdGhjYXJlfGVufDF8fHx8MTc2MTM0Mjc3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
  },
  {
    id: '4',
    name: 'Комплекс с женьшенем',
    description: 'Традиционная азиатская формула с женьшенем для энергии, концентрации и общего благополучия.',
    price: 6290,
    category: 'БАДы',
    image: 'https://images.unsplash.com/photo-1707129785947-ddc627a8bab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwc3VwcGxlbWVudHN8ZW58MXx8fHwxNzYxMzAxNjUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false,
  },
  {
    id: '5',
    name: 'Витамин C Плюс',
    description: 'Улучшенная формула витамина C с натуральными биофлавоноидами для оптимального усвоения.',
    price: 3190,
    category: 'Витамины',
    image: 'https://images.unsplash.com/photo-1713434638446-13b4a15b728e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzcyUyMHByb2R1Y3RzfGVufDF8fHx8MTc2MTM0Mjc3MXww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false,
  },
  {
    id: '6',
    name: 'Кальций комплекс',
    description: 'Полная формула кальция с витамином D3 для здоровья и крепости костей.',
    price: 3890,
    category: 'Витамины',
    image: 'https://images.unsplash.com/photo-1760307837671-63ee641f9f1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjBtZWRpY2luZSUyMGJvdHRsZXN8ZW58MXx8fHwxNzYxMzQyNzcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false,
  },
];

export const categories = ['Все', 'БАДы', 'Масла', 'Витамины'];
