<script setup lang="ts">
import { SfScrollable } from '@crearis/vue';
// #TODO: 0.5.3 fix Product-Typing
// import { Product } from '../graphql';

defineProps({
  heading: String,
  text: String,
});

const { loadProductTemplateList, loading, productTemplateList } = useProductTemplate('');
const { getRegularPrice, getSpecialPrice } = useProductAttributes();


const numOfProducts = 10;
await loadProductTemplateList({pageSize: numOfProducts});
</script>

<template>
  <h2
    v-if="heading"
    class="text-center mb-6 font-bold typography-headline-3 md:typography-headline-2"
  >
    {{ heading }}
  </h2>
  <p class="my-4 typography-text-lg">
    {{ text }}
  </p>
  <SfScrollable
    buttons-placement="floating"
    class="items-center pb-4"
    data-testid="product-slider"
    v-if="productTemplateList.length > 0"
  >

  <!-- #TODO: 0.5.3 fix Product-Typing
      :regular-price="getRegularPrice((productTemplate.firstVariant as Product))"
      :special-price="getSpecialPrice((productTemplate.firstVariant as Product))"
      :first-variant="(productTemplate.firstVariant as Product)"
  -->

    <LazyUiProductCard
      v-for="productTemplate in productTemplateList"
      class="min-w-[190px]"
      :key="productTemplate.id"
      :slug="productTemplate?.slug || ''"
      :name="productTemplate?.name || ''"
      :image-url="$getImage(String(productTemplate.image), 370, 370, String(productTemplate.imageFilename))"
      :image-alt="productTemplate?.name || ''"
      :regular-price="getRegularPrice((productTemplate.firstVariant))"
      :special-price="getSpecialPrice((productTemplate.firstVariant))"
      :is-in-wishlist="productTemplate?.isInWishlist || false"
      :rating-count="productTemplate.ratingCount"
      :rating="productTemplate.rating"
      :first-variant="(productTemplate.firstVariant)"
    />
  </SfScrollable>
</template>
