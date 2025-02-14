<script setup lang="ts">
import { SfButton, SfIconTune, useDisclosure } from '@crearis/vue';
import { Product } from '../../graphql';

const route = useRoute();

const { isOpen, open, close } = useDisclosure();
const { loadProductTemplateList, organizedAttributes, loading, productTemplateList, totalItems, categories } = useProductTemplate(String(route.params.id));
const { getRegularPrice, getSpecialPrice } = useProductAttributes();
const { getFacetsFromURL } = useUiHelpers();

const breadcrumbs = [
  { name: 'Home', link: '/' },
  { name: 'Category', link: `Category/${route.params.id}` },
];

const maxVisiblePages = ref(1);
const setMaxVisiblePages = (isWide: boolean) => (maxVisiblePages.value = isWide ? 5 : 1);

watch(isWideScreen, (value) => setMaxVisiblePages(value));
watch(isTabletScreen, (value) => {
  if (value && isOpen.value) {
    close();
  }
});

watch(() => route.fullPath, async(value) => {
  await loadProductTemplateList(getFacetsFromURL(route.query));
}, {deep: true });

const pagination = computed(() => ({
  currentPage: 1,
  totalPages: Math.ceil(totalItems.value / 12) || 1,
  totalItems: totalItems.value,
  itemsPerPage: 12,
  pageOptions: [5, 12, 15, 20],
}));

onMounted(() => {
  setMaxVisiblePages(isWideScreen.value);
});

await loadProductTemplateList(getFacetsFromURL(route.query));
</script>
<template>
  <div class="pb-20">
    <UiBreadcrumb :breadcrumbs="breadcrumbs" class="self-start mt-5 mb-14" />
    <h1 class="font-bold typography-headline-3 md:typography-headline-2 mb-10">
      All products
    </h1>
    <div class="grid grid-cols-12 lg:gap-x-6">
      <div class="col-span-12 lg:col-span-4 xl:col-span-3">
        <CategoryFilterSidebar
          class="hidden lg:block"
          :attributes="organizedAttributes"
          :categories="categories"
        />
        <LazyCategoryMobileSidebar :is-open="isOpen" @close="close">
          <template #default>
            <CategoryFilterSidebar
              class="block lg:hidden"
              @close="close"
              :attributes="organizedAttributes"
              :categories="categories"
            />
          </template>
        </LazyCategoryMobileSidebar>
      </div>
      <div class="col-span-12 lg:col-span-8 xl:col-span-9">
        <template v-if="!loading">
          <div class="flex justify-between items-center mb-6">
            <span class="font-bold font-headings md:text-lg"
              >{{ totalItems }} Products
            </span>
            <SfButton
              @click="open"
              variant="tertiary"
              class="lg:hidden whitespace-nowrap"
            >
              <template #prefix>
                <SfIconTune />
              </template>
              Filter
            </SfButton>
          </div>
          <section
            v-if="productTemplateList.length > 0"
            class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-8"
          >
            <LazyUiProductCard
              v-for="productTemplate in productTemplateList"
              :key="productTemplate.id"
              :name="productTemplate?.name || ''"
              :slug="mountUrlSlugForProductVariant((productTemplate.firstVariant || productTemplate) as Product)"
              :image-url="$getImage(String(productTemplate.image), 370, 370, String(productTemplate.imageFilename))"
              :image-alt="productTemplate?.name || ''"
              :regular-price="getRegularPrice((productTemplate.firstVariant as Product)) || 250"
              :special-price="getSpecialPrice((productTemplate.firstVariant as Product))"
              :is-in-wishlist ="productTemplate?.isInWishlist || false"
              :rating-count="123"
              :rating="Number(4)"
              :first-variant="(productTemplate.firstVariant as Product)"
            />
          </section>
          <CategoryEmptyState v-else />
          <LazyUiPagination
            v-if="pagination.totalPages > 1"
            class="mt-5"
            :current-page="pagination.currentPage"
            :total-items="pagination.totalItems"
            :page-size="pagination.itemsPerPage"
            :max-visible-pages="maxVisiblePages"
          />
        </template>
        <template v-else>
          <div class="w-full text-center">Loading Products...</div>
        </template>
      </div>
    </div>
  </div>
</template>
