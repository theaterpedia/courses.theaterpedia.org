/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AttributeValue, Category, Product, ProductResponse, ProductTemplateListResponse, ProductVariant, ProductVariantData, QueryProductArgs, QueryProductVariantArgs, QueryProductsArgs } from '~/graphql';
import { QueryName } from '~/server/queries';
import { useProductAttributes } from './useProductAttributes';

const { getRegularPrice, getSpecialPrice } = useProductAttributes();
export const useProduct = (slug?: string) => {
  const { $sdk } = useNuxtApp();

  const loading = ref(false);
  const product = useState<Product>(`product-${slug}`, () => ({} as Product));

  const breadcrumbs = computed(() => {
    if (product?.value?.categories) {
      const category = product?.value?.categories[0];
      return [
        { name: 'Home', link: '/' },
        { name: category.name, link: `/category/${category.id}` },
        { name: product?.value?.name, link: `product/${product?.value?.name}` },
      ];
    }

    return [
      { name: 'Home', link: '/' },
      { name: 'Product'},
      { name: product?.value?.name, link: `product/${product?.value?.name}` },
    ];
  });

  const withBase = (filepath: string | null) => `https://vsfdemo15.labs.odoogap.com${filepath}`;

  const images = computed(() => {
    return [
      {
        imageSrc: withBase(product?.value?.image),
        imageThumbSrc: withBase(product?.value?.image),
        alt: product?.value?.name,
      },
    ];
  });

  const getAllSizes = computed(() => {
    const sizes = product?.value?.attributeValues?.filter((item: any) => {
      return item.attribute.name === 'Size';
    });
    return sizes?.map((item: any) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
  });

  const getAllColors = computed(() => {
    const colors = product?.value?.attributeValues?.filter((item: any) => {
      return item.attribute.name === 'Color';
    });
    return colors?.map((item: any) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
  });
  const getAllMaterials = computed(() => {
    const materials = product?.value?.attributeValues?.filter((item: any) => {
      return item.attribute.name === 'Material';
    });
    return materials?.map((item: any) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
  });

  const specialPrice = computed(() => {
    if (!product.value.firstVariant) {
      return;
    }
    return getSpecialPrice(product?.value.firstVariant);
  });

  const regularPrice = computed(() => {
    if (!product.value.firstVariant) {
      return;
    }
    return getRegularPrice(product?.value.firstVariant);
  });

  const loadProduct = async(params: QueryProductArgs) => {
    loading.value = true;
    try {
      const {data} = await useAsyncData(`product-${slug}`, async () => {
        const {data} = await $sdk().odoo.query<QueryProductArgs, ProductResponse>(
          {queryName: QueryName.GetProduct}, params);
        return data.value;
      });

      if (data?.value?.product)
        product.value = data?.value?.product;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    loadProduct,
    product,
    breadcrumbs,
    images,
    getAllSizes,
    getAllColors,
    getAllMaterials,
    regularPrice,
    specialPrice
  };
};
