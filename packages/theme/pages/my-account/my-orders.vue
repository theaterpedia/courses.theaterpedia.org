<template>
  <UiDivider class="w-screen -mx-4 md:col-span-3 md:w-auto md:mx-0" />
  <h2 class="hidden md:block typography-headline-4 font-bold mx-4 capitalize">
    {{ $t('account.ordersAndReturns.myOrders') }}
  </h2>
  <div v-if="!data" class="col-span-3 text-center mt-8">
    <NuxtImg
      src="/images/empty-cart.svg"
      :alt="$t('account.ordersAndReturns.noOrdersAltText')"
      width="192"
      height="192"
      class="mx-auto"
    />
    <h3 class="typography-headline-3 font-bold mb-4 mt-6">
      {{ $t('account.ordersAndReturns.noOrders') }}
    </h3>
    <SfButton variant="secondary" class="!ring-neutral-200">
      {{ $t('account.ordersAndReturns.continue') }}</SfButton
    >
  </div>
  <div v-else class="col-span-3">
    <ul
      class="md:hidden my-4 last-of-type:mb-0"
      v-for="{ id, date, paymentAmount, status } in data"
      :key="id"
    >
      <li>
        <p class="block typography-text-sm font-medium">
          {{ $t('account.ordersAndReturns.orderId') }}
        </p>
        <span class="block typography-text-sm mb-2">{{ id }}</span>
      </li>
      <li>
        <p class="block typography-text-sm font-medium">
          {{ $t('account.ordersAndReturns.orderDate') }}
        </p>
        <span class="block typography-text-sm mb-2">{{ date }}</span>
      </li>
      <li>
        <p class="block typography-text-sm font-medium">
          {{ $t('account.ordersAndReturns.amount') }}
        </p>
        <span class="block typography-text-sm mb-2">${{ paymentAmount }}</span>
      </li>
      <li class="flex flex-wrap items-center mb-2">
        <p class="block typography-text-sm -mb-1.5 font-medium flex-[100%]">
          {{ $t('account.ordersAndReturns.status') }}
        </p>
        <span class="block typography-text-sm flex-1">{{ status }}</span>
        <SfButton
          :tag="NuxtLink"
          size="sm"
          variant="tertiary"
          :to="`'/my-account/my-orders/'${id}`"
        >
          {{ $t('account.ordersAndReturns.details') }}</SfButton
        >
      </li>
      <UiDivider class="w-screen -mx-4 md:col-span-3 md:w-auto md:mx-0" />
    </ul>
    <table class="hidden md:block text-left typography-text-sm mx-4">
      <caption class="hidden">
        List of orders
      </caption>
      <thead class="border-b-2 border-neutral-200">
        <tr>
          <th class="py-4 pr-4 font-medium">
            {{ $t('account.ordersAndReturns.orderId') }}
          </th>
          <th class="py-4 px-4 font-medium lg:whitespace-nowrap">
            {{ $t('account.ordersAndReturns.orderDate') }}
          </th>
          <th class="py-4 px-4 font-medium">
            {{ $t('account.ordersAndReturns.amount') }}
          </th>
          <th class="py-4 px-4 font-medium">
            {{ $t('account.ordersAndReturns.status') }}
          </th>
          <th class="py-4 pl-4"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="{ id, date, paymentAmount, status } in data"
          :key="id"
          class="border-b border-neutral-200"
        >
          <td class="py-4 pr-4 lg:whitespace-nowrap">{{ id }}</td>
          <td class="p-4 lg:whitespace-nowrap">{{ date }}</td>
          <td class="p-4">${{ paymentAmount }}</td>
          <td :class="['p-4', { 'text-negative-700': status === 'Cancelled' }]">
            {{ status }}
          </td>
          <td class="py-1.5 pl-4 text-right w-full">
            <SfButton
              :tag="NuxtLink"
              size="sm"
              variant="tertiary"
            >
              {{ $t('account.ordersAndReturns.details') }}</SfButton
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { SfButton } from '@crearis/vue';

definePageMeta({
  layout: 'account',
});

const data = ref([
  {
    id: '0e4fec5a-61e6-48b8-94cc-d5f77687e2b0	',
    date: '2022-08-11	',
    paymentAmount: '295.87',
    status: 'Completed',
  },
  {
    id: '0e4fec5a-61e6-48b8-94cc-d5f77687e2b0	',
    date: '2022-08-11	',
    paymentAmount: '295.87',
    status: 'Completed',
  },
  {
    id: '0e4fec5a-61e6-48b8-94cc-d5f77687e2b0	',
    date: '2022-08-11	',
    paymentAmount: '295.87',
    status: 'Open',
  },
  {
    id: '0e4fec5a-61e6-48b8-94cc-d5f77687e2b0	',
    date: '2022-08-11	',
    paymentAmount: '295.87',
    status: 'Cancelled',
  },
]);

const NuxtLink = resolveComponent('NuxtLink');
</script>
