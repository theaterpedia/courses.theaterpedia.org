<script lang="ts" setup>
import { SfRating, SfCounter, SfLink, SfButton, SfIconShoppingCart, SfIconFavorite } from '@crearis/vue';
import { useToast } from 'vue-toastification';

defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
  imageAlt: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  ratingCount: {
    type: Number,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  regularPrice: {
    type: Number,
    required: true,
  },
  specialPrice: {
    type: Number,
    required: false,
  },
  isInWishlist: {
    type: Boolean,
    required: false,
  },
  firstVariant: {
    type: Object,
    required: false,
  },
});

const { cartAdd } = useCart();
const { WishlistAddItem } = useWishlist();
const toast = useToast();

const addToWishlist = async (firstVariant: any) => {
  const response = await WishlistAddItem(firstVariant.id);
  if (response) {
    toast.success('Product has been added to wishlist');
  } else {
    toast.warning('Product has already been added to wishlist');
  }
};
</script>
<template>
  <div class="relative border border-neutral-200 rounded-md hover:shadow-lg min-h-[350px]">
    <div class="relative">
      <SfLink :href="slug">
        <NuxtImg
          :src="imageUrl"
          :alt="imageAlt"
          :width="370"
          :height="370"
          class="rounded-md"
        />
      </SfLink>
      <SfButton
        type="button"
        variant="tertiary"
        size="sm"
        square
        :class="[
          'absolute bottom-0 right-0 mr-2 mb-2 bg-white border border-neutral-200 !rounded-full',
          { '!bg-green-200': isInWishlist },
        ]"
        aria-label="Add to wishlist"
        @click="addToWishlist(firstVariant)"
      >
        <SfIconFavorite size="sm" />
      </SfButton>
    </div>
    <div class="p-2 border-t border-neutral-200 typography-text-sm">
      <SfLink :href="slug" variant="secondary" class="no-underline">
        {{ name }}
      </SfLink>
      <div class="flex items-center pt-1">
        <SfRating size="xs" :value="rating ?? 0" :max="5" />
        <SfLink
          to="#"
          variant="secondary"
          class="ml-1 no-underline"
        >
          <SfCounter size="xs">{{ ratingCount }}</SfCounter>
        </SfLink>
      </div>
      <p
        v-if="description"
        class="block py-2 font-normal leading-5 typography-text-sm text-neutral-700"
      >
        {{ description }}
      </p>
      <div class="block pb-10 pt-3">
        <span class="font-bold typography-text-sm">${{ regularPrice }}</span>
        <span
          v-if="specialPrice"
          class="ml-1.5 font-normal typography-text-xs line-through"
          >${{ specialPrice }}</span
        >
      </div>
      <SfButton
        type="button"
        class="absolute bottom-2"
        size="sm"
        @click="cartAdd(firstVariant?.id, 1)"
      >
        <template #prefix>
          <SfIconShoppingCart size="sm" />
        </template>
        Add
      </SfButton>
    </div>
  </div>
</template>
