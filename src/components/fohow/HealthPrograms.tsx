
'use client';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { productsData } from '@/lib/products';

type Program = 'immunity' | 'detox' | 'cardio' | null;

const getProductName = (id: string) => {
    const product = productsData.find(p => p.id === id);
    return product ? product.name : id;
};

export default function HealthPrograms() {
  const [activeProgram, setActiveProgram] = useState<Program>(null);

  const programDetailsContent = {
    immunity: (
      <div className="text-left">
        <h4 className="font-bold text-lg mb-2 text-emerald-600">
          Программа Укрепления (Иммунитет)
        </h4>
        <p>
          <strong>Цель:</strong> Общая поддержка иммунитета и специфическое
          усиление Ян-энергии.
        </p>
        <p>
          <strong>Рекомендация:</strong> Ротация или комбинация{' '}
          <strong>{getProductName('yubileinyi-eliksir-feniks')}</strong> (для общего иммунитета)
          и <strong>{getProductName('eliksir-3-dragotsennosti')}</strong> (для поддержки
          Ян-энергии и почек).
        </p>
      </div>
    ),
    detox: (
      <div className="text-left">
        <h4 className="font-bold text-lg mb-2 text-sky-600">
          Программа Очистки и Детоксикации
        </h4>
        <p>
          <strong>Цель:</strong> Пребиотическая поддержка ЖКТ и системная
          очистка организма.
        </p>
        <p>
          <strong>Рекомендация:</strong> Совместное применение{' '}
          <strong>{getProductName('fruktovaya-pasta-roza')}</strong> (для микрофлоры) и{' '}
          <strong>{getProductName('eliksir-santsiin')}</strong> (для тройной очистки кишечника, токсинов и жиров в крови).
        </p>
      </div>
    ),
    cardio: (
      <div className="text-left">
        <h4 className="font-bold text-lg mb-2 text-rose-600">
          Программа Сердечно-Сосудистой Поддержки
        </h4>
        <p>
          <strong>Цель:</strong> Комплексная поддержка для реологии крови,
          метаболизма и минерального баланса.
        </p>
        <p>
          <strong>Рекомендация:</strong> Комбинация{' '}
          <strong>{getProductName('kapsuly-syuechinfu')}</strong> (для разжижения крови),{' '}
          <strong>{getProductName('kapsuly-tasuan')}</strong> (для регуляции жирового обмена) и{' '}
          <strong>{getProductName('kaltsiy-khai-tsyuogai')}</strong> (минеральная поддержка).
        </p>
      </div>
    ),
  };

  return (
    <section>
      <div className="mb-8">
        <p className="text-center text-gray-700 max-w-3xl mx-auto">
          Синергия — ключ к максимальной эффективности. Здесь представлены
          готовые комплексные программы, составленные из продуктов Fohow для
          достижения конкретных целей: укрепления иммунитета, глубокой
          детоксикации организма или всесторонней поддержки сердечно-сосудистой
          системы. Нажмите на интересующую программу, чтобы увидеть
          рекомендованные комбинации.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card
          className="text-center cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
          onClick={() => setActiveProgram('immunity')}
        >
          <CardHeader>
            <CardTitle className="text-2xl text-emerald-600">
              Укрепление Иммунитета
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Комплексная поддержка защитных сил организма и энергии Ян.
            </p>
          </CardContent>
        </Card>
        <Card
          className="text-center cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
          onClick={() => setActiveProgram('detox')}
        >
          <CardHeader>
            <CardTitle className="text-2xl text-sky-600">
              Очистка и Детоксикация
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Поддержка ЖКТ, микрофлоры и системная очистка.</p>
          </CardContent>
        </Card>
        <Card
          className="text-center cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
          onClick={() => setActiveProgram('cardio')}
        >
          <CardHeader>
            <CardTitle className="text-2xl text-rose-600">
              Поддержка Сердца и Сосудов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Контроль вязкости крови, липидного обмена и минеральная
              поддержка.
            </p>
          </CardContent>
        </Card>
      </div>
      <Card
        className={`mt-8 min-h-[150px] transition-opacity duration-500 ${
          activeProgram ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <CardContent className="p-6 flex items-center justify-center">
          {activeProgram ? (
            programDetailsContent[activeProgram]
          ) : (
            <p className="text-gray-500">
              Выберите программу, чтобы увидеть детали.
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
