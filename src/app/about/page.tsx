import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="mb-4">О компании Fohow</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Мы — официальные представители Fohow в Курске. Наша миссия — нести здоровье и благополучие в каждый дом, предлагая продукцию, созданную на основе тысячелетних знаний традиционной китайской медицины.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVhbXxlbnwwfHx8fDE3NjEzNDI3NzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Команда Fohow"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div>
            <h2 className="mb-4">Наша философия</h2>
            <p className="text-muted-foreground leading-relaxed">
              В основе нашей работы лежат три ключевых принципа: качество, натуральность и научный подход. Мы верим, что природа дает нам все необходимое для здоровья, а современные технологии позволяют создавать высокоэффективные и безопасные продукты.
              <br /><br />
              Каждый продукт Fohow проходит строгий контроль качества на всех этапах производства — от выбора сырья до упаковки. Мы сотрудничаем с ведущими специалистами и научно-исследовательскими институтами, чтобы гарантировать вам лучшее.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="mb-4">Присоединяйтесь к нам</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Мы всегда открыты для сотрудничества и будем рады видеть вас в нашей команде партнёров или в числе довольных клиентов. Откройте для себя мир Fohow и измените свою жизнь к лучшему.
          </p>
        </div>
      </div>
    </div>
  );
}
