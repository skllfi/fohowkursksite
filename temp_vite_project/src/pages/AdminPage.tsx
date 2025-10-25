import { Edit, LogOut, Plus, Search, Trash2, Upload } from 'lucide-react';
import { useState } from 'react';
import { useFirebase } from '../lib/firebase-context';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';

export function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    featured: false,
    imageUrl: '',
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{ id: string; name: string; image?: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { products, loading, addProduct, updateProduct, deleteProduct } = useFirebase();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === 'admin' && loginData.password === 'admin') {
      setIsLoggedIn(true);
    } else {
      alert('Неверные данные. Используйте: admin / admin');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const productData = {
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        category: productForm.category,
        featured: productForm.featured,
        image: productForm.imageUrl || 'https://images.unsplash.com/photo-1713434638446-13b4a15b728e?w=1080',
      };

      if (editingProductId) {
        // Обновление существующего товара
        await updateProduct(editingProductId, productData, selectedImage || undefined);
        alert('Товар успешно обновлён!');
      } else {
        // Добавление нового товара
        await addProduct(productData, selectedImage || undefined);
        alert('Товар успешно добавлен!');
      }

      // Очистка формы
      setProductForm({
        name: '',
        description: '',
        price: '',
        category: '',
        featured: false,
        imageUrl: '',
      });
      setSelectedImage(null);
      setImagePreview('');
      setEditingProductId(null);
    } catch (error) {
      console.error('Ошибка сохранения товара:', error);
      alert('Ошибка сохранения товара. Проверьте настройки Firebase.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProduct = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      setProductForm({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        featured: product.featured,
        imageUrl: product.image,
      });
      setImagePreview(product.image);
      setEditingProductId(id);
      // Переключаемся на вкладку редактирования
      document.querySelector('[value="add-product"]')?.dispatchEvent(new MouseEvent('click'));
    }
  };

  const handleDeleteClick = (id: string, name: string, image?: string) => {
    setProductToDelete({ id, name, image });
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete.id, productToDelete.image);
        alert('Товар успешно удалён!');
      } catch (error) {
        console.error('Ошибка удаления товара:', error);
        alert('Ошибка удаления товара.');
      }
    }
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleCancelEdit = () => {
    setProductForm({
      name: '',
      description: '',
      price: '',
      category: '',
      featured: false,
      imageUrl: '',
    });
    setSelectedImage(null);
    setImagePreview('');
    setEditingProductId(null);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center bg-muted/30">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Вход в админ-панель</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Логин</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Введите логин"
                  value={loginData.username}
                  onChange={(e) =>
                    setLoginData({ ...loginData, username: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Введите пароль"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Войти
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Демо-данные: admin / admin
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Admin Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2">Панель управления</h1>
            <p className="text-muted-foreground">
              Управление продукцией и контентом
            </p>
          </div>
          <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
            <LogOut className="mr-2 h-4 w-4" />
            Выход
          </Button>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList>
            <TabsTrigger value="products">Продукция ({products.length})</TabsTrigger>
            <TabsTrigger value="add-product">
              {editingProductId ? 'Редактировать товар' : 'Добавить товар'}
            </TabsTrigger>
          </TabsList>

          {/* Products List */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Список продукции</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Поиск товаров..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Загрузка товаров...</p>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Товары не найдены</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Изображение</TableHead>
                          <TableHead>Название</TableHead>
                          <TableHead>Категория</TableHead>
                          <TableHead>Цена</TableHead>
                          <TableHead>Статус</TableHead>
                          <TableHead className="text-right">Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                            </TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{product.category}</Badge>
                            </TableCell>
                            <TableCell>{product.price.toFixed(0)} ₽</TableCell>
                            <TableCell>
                              {product.featured ? (
                                <Badge variant="secondary">Хит</Badge>
                              ) : (
                                <Badge variant="outline">Активный</Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditProduct(product.id)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    handleDeleteClick(product.id, product.name, product.image)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add/Edit Product Form */}
          <TabsContent value="add-product">
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingProductId ? 'Редактировать товар' : 'Добавить новый товар'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProductSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="productName">Название товара *</Label>
                      <Input
                        id="productName"
                        type="text"
                        placeholder="Введите название товара"
                        value={productForm.name}
                        onChange={(e) =>
                          setProductForm({ ...productForm, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Категория *</Label>
                      <Input
                        id="category"
                        type="text"
                        placeholder="Например: БАДы"
                        value={productForm.category}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            category: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Цена (₽) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={productForm.price}
                      onChange={(e) =>
                        setProductForm({ ...productForm, price: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Описание *</Label>
                    <Textarea
                      id="description"
                      placeholder="Введите описание товара"
                      rows={6}
                      value={productForm.description}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">URL изображения (опционально)</Label>
                    <Input
                      id="imageUrl"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={productForm.imageUrl}
                      onChange={(e) =>
                        setProductForm({ ...productForm, imageUrl: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Или загрузите файл ниже
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Загрузить изображение</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Загрузите изображение (JPG, PNG, макс. 5МБ)
                    </p>
                    {imagePreview && (
                      <div className="mt-4">
                        <img
                          src={imagePreview}
                          alt="Предпросмотр"
                          className="w-32 h-32 object-cover rounded border"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={productForm.featured}
                      onCheckedChange={(checked) =>
                        setProductForm({
                          ...productForm,
                          featured: checked as boolean,
                        })
                      }
                    />
                    <Label htmlFor="featured" className="cursor-pointer">
                      Отметить как популярный товар (хит продаж)
                    </Label>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>Сохранение...</>
                      ) : (
                        <>
                          {editingProductId ? (
                            <>
                              <Edit className="mr-2 h-4 w-4" />
                              Обновить товар
                            </>
                          ) : (
                            <>
                              <Plus className="mr-2 h-4 w-4" />
                              Добавить товар
                            </>
                          )}
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelEdit}
                      disabled={isSubmitting}
                    >
                      {editingProductId ? 'Отменить редактирование' : 'Очистить форму'}
                    </Button>
                  </div>

                  {!editingProductId && (
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h6 className="mb-2">Настройка Firebase:</h6>
                      <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                        <li>Создайте проект в Firebase Console</li>
                        <li>Включите Firestore Database и Storage</li>
                        <li>Скопируйте конфигурацию в /lib/firebase-config.ts</li>
                        <li>Настройте правила безопасности Firestore</li>
                      </ol>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
            <AlertDialogDescription>
              Вы действительно хотите удалить товар "{productToDelete?.name}"?
              Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
