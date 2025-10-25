import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="mb-4">Свяжитесь с нами</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            У вас есть вопросы или предложения? Мы всегда рады помочь. Заполните форму ниже или свяжитесь с нами любым удобным способом.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <form className="space-y-4">
              <Input type="text" placeholder="Ваше имя" />
              <Input type="email" placeholder="Ваш Email" />
              <Textarea placeholder="Ваше сообщение" rows={6} />
              <Button type="submit" size="lg">Отправить сообщение</Button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h2 className="mb-4">Наши контакты</h2>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h5 className="mb-1">Адрес</h5>
                <p className="text-muted-foreground">г. Курск, ул. Ленина, д. 1, офис 1</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h5 className="mb-1">Телефон</h5>
                <p className="text-muted-foreground">+7 (XXX) XXX-XX-XX</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h5 className="mb-1">Email</h5>
                <p className="text-muted-foreground">info@fohowkursk.ru</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
