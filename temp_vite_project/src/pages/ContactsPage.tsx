import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';

export function ContactsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="mb-4">Свяжитесь с нами</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Есть вопросы? Мы здесь, чтобы помочь. Свяжитесь с нами, и мы ответим
            как можно скорее.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-7 w-7 text-primary" />
              </div>
              <h5 className="mb-2">Адрес</h5>
              <p className="text-sm text-muted-foreground">
                г. Курск, Россия
                <br />
                ул. Название улицы, д. 1<br />
                офис/квартира 123
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-7 w-7 text-primary" />
              </div>
              <h5 className="mb-2">Телефон</h5>
              <p className="text-sm text-muted-foreground">
                +7 (XXX) XXX-XX-XX
                <br />
                Пн-Пт: 9:00 - 18:00
                <br />
                Сб: 10:00 - 15:00
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-7 w-7 text-primary" />
              </div>
              <h5 className="mb-2">Email</h5>
              <p className="text-sm text-muted-foreground">
                info@fohowkursk.ru
                <br />
                support@fohowkursk.ru
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Map Placeholder */}
          <div>
            <h3 className="mb-6">Наше местоположение</h3>
            <div className="aspect-square md:aspect-auto md:h-[500px] rounded-xl bg-muted flex items-center justify-center border">
              <div className="text-center p-8">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Место для карты
                  <br />
                  <small className="text-xs">
                    Добавьте встроенную карту Google Maps или другой компонент карты
                  </small>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="mb-6">Отправьте нам сообщение</h3>
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (XXX) XXX-XX-XX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение *</Label>
                    <Textarea
                      id="message"
                      placeholder="Как мы можем вам помочь?"
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="mr-2 h-5 w-5" />
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
