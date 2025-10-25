import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase-config';
import { Product } from './product-data';

interface FirebaseContextType {
  products: Product[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id'>, image?: File) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>, image?: File) => Promise<void>;
  deleteProduct: (id: string, imageUrl?: string) => Promise<void>;
  refreshProducts: () => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Загрузка товаров из Firestore
  const loadProducts = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'products'), orderBy('name'));
      const querySnapshot = await getDocs(q);
      const productsData: Product[] = [];
      
      querySnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() } as Product);
      });
      
      setProducts(productsData);
    } catch (error) {
      console.error('Ошибка загрузки товаров:', error);
      // Если Firebase не настроен, используем mock данные
      const mockProducts = [
        {
          id: '1',
          name: 'Кордицепс Китайский',
          description: 'Премиальный экстракт кордицепса для жизненной энергии и силы. Натуральная поддержка иммунитета.',
          price: 6990,
          category: 'БАДы',
          image: 'https://images.unsplash.com/photo-1713434638446-13b4a15b728e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
          featured: true,
        },
        {
          id: '2',
          name: 'Споровое масло Линчжи',
          description: 'Высококачественное масло спор гриба Рейши в капсулах для иммунитета и здоровья.',
          price: 9990,
          category: 'БАДы',
          image: 'https://images.unsplash.com/photo-1760307837671-63ee641f9f1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
          featured: true,
        },
        {
          id: '3',
          name: 'Масло облепихи',
          description: 'Богато омега жирными кислотами и витаминами. Поддерживает здоровье сердца и кожи.',
          price: 5490,
          category: 'Масла',
          image: 'https://images.unsplash.com/photo-1618322704514-b2e39eadd2d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
          featured: true,
        },
      ];
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка изображения в Firebase Storage
  const uploadImage = async (file: File): Promise<string> => {
    const timestamp = Date.now();
    const fileName = `products/${timestamp}_${file.name}`;
    const storageRef = ref(storage, fileName);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  // Добавление нового товара
  const addProduct = async (product: Omit<Product, 'id'>, image?: File) => {
    try {
      let imageUrl = product.image;
      
      if (image) {
        imageUrl = await uploadImage(image);
      }

      await addDoc(collection(db, 'products'), {
        ...product,
        image: imageUrl,
      });

      await loadProducts();
    } catch (error) {
      console.error('Ошибка добавления товара:', error);
      throw error;
    }
  };

  // Обновление товара
  const updateProduct = async (id: string, product: Partial<Product>, image?: File) => {
    try {
      let imageUrl = product.image;
      
      if (image) {
        // Удаляем старое изображение, если оно есть
        const oldProduct = products.find(p => p.id === id);
        if (oldProduct?.image && oldProduct.image.includes('firebase')) {
          try {
            const oldImageRef = ref(storage, oldProduct.image);
            await deleteObject(oldImageRef);
          } catch (err) {
            console.log('Не удалось удалить старое изображение:', err);
          }
        }
        
        imageUrl = await uploadImage(image);
      }

      const productRef = doc(db, 'products', id);
      await updateDoc(productRef, {
        ...product,
        ...(imageUrl && { image: imageUrl }),
      });

      await loadProducts();
    } catch (error) {
      console.error('Ошибка обновления товара:', error);
      throw error;
    }
  };

  // Удаление товара
  const deleteProduct = async (id: string, imageUrl?: string) => {
    try {
      // Удаляем изображение из Storage, если оно хранится в Firebase
      if (imageUrl && imageUrl.includes('firebase')) {
        try {
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
        } catch (err) {
          console.log('Не удалось удалить изображение:', err);
        }
      }

      const productRef = doc(db, 'products', id);
      await deleteDoc(productRef);

      await loadProducts();
    } catch (error) {
      console.error('Ошибка удаления товара:', error);
      throw error;
    }
  };

  // Обновление списка товаров
  const refreshProducts = async () => {
    await loadProducts();
  };

  useEffect(() => {
    loadProducts();

    // Подписываемся на изменения в реальном времени
    const q = query(collection(db, 'products'), orderBy('name'));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const productsData: Product[] = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() } as Product);
        });
        setProducts(productsData);
        setLoading(false);
      },
      (error) => {
        console.error('Ошибка подписки на изменения:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        products,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        refreshProducts,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}
