<template>
  <UiDivider class="w-screen -mx-4 md:col-span-3 md:w-auto md:mx-0" />
  <AccountProfileData
    class="col-span-3"
    :header="$t('account.accountSettings.billingDetails.billingAddress')"
    :button-text="$t('account.accountSettings.billingDetails.edit')"
    @on-click="open"
  >
    <p>
      {{ userShippingAddress.firstName }} {{ userShippingAddress.lastName }}
    </p>
    <p>{{ userShippingAddress.phoneNumber }}</p>
    <p>{{ userShippingAddress.address1 }} {{ userShippingAddress.address2 }}</p>
    <p>
      {{ userShippingAddress.city }}, {{ userShippingAddress.state }}
      {{ userShippingAddress.postalCode }}
    </p>
  </AccountProfileData>
  <UiDivider class="w-screen -mx-4 md:col-span-3 md:w-auto md:mx-0" />
  <UiOverlay v-if="isOpen" :visible="isOpen">
    <SfModal
      v-model="isOpen"
      tag="section"
      role="dialog"
      class="h-full w-full overflow-auto md:w-[600px] md:h-fit"
      aria-labelledby="address-modal-title"
    >
      <header>
        <SfButton
          square
          variant="tertiary"
          class="absolute right-2 top-2"
          @click="close"
        >
          <SfIconClose />
        </SfButton>
        <h3
          id="address-modal-title"
          class="text-neutral-900 text-lg md:text-2xl font-bold mb-4"
        >
          {{ $t('account.accountSettings.billingDetails.billingAddress') }}
        </h3>
      </header>
      <FormAddAddress
        :saved-address="userShippingAddress"
        type="billingAddress"
        @on-save="close"
        @on-close="close"
      />
    </SfModal>
  </UiOverlay>
</template>

<script setup lang="ts">
import {
  SfButton,
  SfIconClose,
  SfModal,
  useDisclosure,
} from '@crearis/vue';

definePageMeta({
  layout: 'account',
});
const { isOpen, open, close } = useDisclosure();

const userShippingAddress = ref({
  firstName: 'Hieronim',
  lastName: 'Anonim',
  address1: 'Oak Drive',
  address2: '3633',
  city: 'Colonie',
  country: 'US',
  phoneNumber: '+1 321 765 0987',
  postalCode: '12205',
  state: 'NY',
  titleCode: '',
});
</script>
