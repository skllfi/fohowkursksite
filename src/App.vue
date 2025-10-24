<template>
  <div>
    <h1>Продукты Fohow</h1>
    <div v-if="products.length === 0">Загрузка...</div>
    <div v-for="p in products" :key="p.id" class="card">
      <h3>{{ p.name }}</h3>
      <p>{{ p.description }}</p>
      <strong>{{ p.price }} ₽</strong>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase';

const products = ref([]);

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  products.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});
</script>

<style>
.card {
  border: 1px solid #ddd;
  padding: 12px;
  margin: 8px;
  border-radius: 6px;
}
</style>
