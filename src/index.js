import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase';

async function loadProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach(doc => {
    const data = doc.data();
    console.log(data); // или рендерим карточку на сайте
  });
}

loadProducts();
