<script setup>
    defineEmits(['add-to-cart'])
    defineProps(['products'])
    import { useRouter } from 'vue-router'
    const router = useRouter()

    function openProduct(id) {
        router.push({ name: 'Product', params: { id } })
    }
</script>

<template>
    <section class="products">
        <article class="product" v-for="product in products" :key="product.id">
            <img :src="product.cover" :alt="product.title" @click="openProducts(product.id)" />
            <h2>{{ product.title }}</h2>
            <p class="product-author">{{ product.author }}</p>
            <span class="price-and-like">
                <p class="product-price">R$ {{ product.price.toFixed(2) }}</p>
                <span class="mdi mdi-heart-outline"></span>
            </span>
            <button @click="$emit('add-to-cart', product)"><span class="mdi mdi-cart"></span>Comprar</button>
        </article>
    </section>
</template>

<style scoped>
.products {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    padding: 5vh 8vw;
}

.product {
        display: flex;
        flex-direction: column;
        min-width: 300px;
        width: calc(100% / 4 - 42px);
        margin: 20px;
}
 h2 {
            font-size: 1.5rem;
            font-weight: 700;
        }

 .product-author {
            font-size: 1rem;
        }

.product-price {
            font-size: 1.2rem;
            font-weight: 700;
        }
 .price-and-like {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
 }

 .mdi-heart-outline {
                font-size: 1.3rem;
                color: #27ae60;
            }



</style>
