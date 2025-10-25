# Настройка Firebase для Fohow Курск

## Шаг 1: Создание проекта Firebase

1. Перейдите на [Firebase Console](https://console.firebase.google.com/)
2. Нажмите "Добавить проект" или "Add project"
3. Введите название проекта (например: "fohow-kursk")
4. Следуйте инструкциям для создания проекта

## Шаг 2: Регистрация веб-приложения

1. В консоли Firebase выберите ваш проект
2. Нажмите на иконку Web (</>) для добавления веб-приложения
3. Введите название приложения (например: "Fohow Kursk Website")
4. Скопируйте конфигурацию Firebase (firebaseConfig)

## Шаг 3: Обновление конфигурации

Откройте файл `/lib/firebase-config.ts` и замените значения на ваши:

```typescript
const firebaseConfig = {
  apiKey: "ВАШИ_ДАННЫЕ",
  authDomain: "ВАШИ_ДАННЫЕ",
  projectId: "ВАШИ_ДАННЫЕ",
  storageBucket: "ВАШИ_ДАННЫЕ",
  messagingSenderId: "ВАШИ_ДАННЫЕ",
  appId: "ВАШИ_ДАННЫЕ"
};
```

## Шаг 4: Настройка Firestore Database

1. В боковом меню выберите "Firestore Database"
2. Нажмите "Создать базу данных" или "Create database"
3. Выберите режим запуска:
   - **Production mode** (рекомендуется) - требует настройки правил безопасности
   - **Test mode** - для тестирования (доступ открыт на 30 дней)

### Правила безопасности Firestore

Для production используйте следующие правила:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Правила для коллекции products
    match /products/{productId} {
      // Разрешить чтение всем
      allow read: if true;
      
      // Разрешить запись только аутентифицированным администраторам
      // Для демо: разрешаем всем (измените это в production!)
      allow write: if true;
    }
  }
}
```

**ВАЖНО**: В production-среде настройте аутентификацию администраторов и ограничьте доступ на запись!

## Шаг 5: Настройка Firebase Storage

1. В боковом меню выберите "Storage"
2. Нажмите "Начать" или "Get started"
3. Выберите регион (рекомендуется: europe-west)

### Правила безопасности Storage

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      // Разрешить чтение всем
      allow read: if true;
      
      // Разрешить загрузку файлов (для демо)
      // В production добавьте аутентификацию!
      allow write: if request.resource.size < 5 * 1024 * 1024 // макс 5MB
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

## Шаг 6: Использование админ-панели

1. Перейдите на страницу "Админ" на сайте
2. Войдите с учетными данными: **admin / admin**
3. Теперь вы можете:
   - Просматривать все товары
   - Добавлять новые товары
   - Редактировать существующие товары
   - Удалять товары
   - Загружать изображения

## Структура данных в Firestore

Коллекция: `products`

```typescript
{
  name: string;           // Название товара
  description: string;    // Описание
  price: number;         // Цена в рублях
  category: string;      // Категория (БАДы, Масла, Витамины)
  image: string;         // URL изображения
  featured: boolean;     // Популярный товар (хит продаж)
}
```

## Рекомендации по безопасности

### Для production-среды:

1. **Настройте Firebase Authentication**:
   ```typescript
   // Добавьте в правила Firestore
   allow write: if request.auth != null && request.auth.token.admin == true;
   ```

2. **Используйте переменные окружения** для хранения конфигурации Firebase

3. **Ограничьте домены** в настройках Firebase Console

4. **Настройте резервное копирование** данных Firestore

5. **Мониторинг использования** через Firebase Console

## Troubleshooting

### Ошибка: "Firebase: Error (auth/api-key-not-valid)"
- Проверьте правильность API ключа в конфигурации

### Ошибка: "Missing or insufficient permissions"
- Проверьте правила безопасности Firestore
- Убедитесь, что правила применены

### Изображения не загружаются
- Проверьте правила безопасности Storage
- Убедитесь, что размер файла не превышает 5MB
- Проверьте формат файла (должен быть image/*)

## Полезные ссылки

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Storage Security Rules](https://firebase.google.com/docs/storage/security)
- [Firebase Console](https://console.firebase.google.com/)
