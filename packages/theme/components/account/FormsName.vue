<template>
  <form @submit.prevent="$emit('on-save')" data-testid="account-forms-name">
    <div class="md:flex justify-between gap-4">
      <label class="block flex-1">
        <UiFormLabel>{{
          $t('account.accountSettings.personalData.firstName')
        }}</UiFormLabel>
        <SfInput
          name="firstname"
          type="text"
          v-model="userData.firstName"
          required
        />
      </label>
      <label class="block flex-1 mt-4 md:mt-0">
        <UiFormLabel>{{
          $t('account.accountSettings.personalData.lastName')
        }}</UiFormLabel>
        <SfInput
          name="lastname"
          type="text"
          v-model="userData.lastName"
          required
        />
      </label>
    </div>
    <div class="mt-6 flex flex-col-reverse md:flex-row md:justify-end gap-4">
      <SfButton type="reset" variant="secondary" @click="$emit('on-cancel')">
        {{ $t('contactInfo.cancel') }}
      </SfButton>
      <SfButton type="submit" class="min-w-[120px]">
        {{ $t('contactInfo.save') }}
      </SfButton>
    </div>
  </form>
</template>
<script lang="ts" setup>
import { SfButton, SfInput } from '@crearis/vue';

type AccountFormsNameProps = {
  firstName?: SfCustomer['firstName'];
  lastName?: SfCustomer['lastName'];
};

const props = defineProps<AccountFormsNameProps>();
const { firstName, lastName } = toRefs(props);
defineEmits(['on-save', 'on-cancel']);
const userData = ref({
  firstName: firstName?.value ?? '',
  lastName: lastName?.value ?? '',
});
</script>
