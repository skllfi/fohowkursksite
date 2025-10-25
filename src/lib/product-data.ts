import { Product } from "@/components/fohow/ProductCard";

export const products: Product[] = [
    {
        id: '1',
        name: 'Линчжи Fohow',
        description: 'Экстракт гриба Линчжи для укрепления иммунитета и общего тонуса организма.',
        price: 2500,
        image: '/images/linchzhi.jpg',
        category: 'Биодобавки',
        featured: true,
    },
    {
        id: '2',
        name: 'Чай Лювэй Fohow',
        description: 'Очищающий и гармонизирующий чай на основе традиционных китайских рецептов.',
        price: 1200,
        image: '/images/tea.jpg',
        category: 'Напитки',
    },
    {
        id: '3',
        name: 'Эликсир 3 драгоценности',
        description: 'Уникальный эликсир для восстановления жизненных сил и энергии.',
        price: 3200,
        image: '/images/elixir.jpg',
        category: 'Эликсиры',
        featured: true,
    },
    {
        id: '4',
        name: 'Капсулы Сюэчинфу',
        description: 'Для здоровья сосудов и улучшения кровообращения.',
        price: 2800,
        image: '/images/suechinfu.jpg',
        category: 'Биодобавки',
    },
];
