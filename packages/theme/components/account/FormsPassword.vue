<template>
  <form @submit.prevent="$emit('on-save')" data-testid="account-forms-password">
    <label class="block">
      <UiFormLabel>{{
        $t('account.accountSettings.personalData.currentPassword')
      }}</UiFormLabel>
      <SfInput
        name="password"
        :type="passwordVisible ? 'text' : 'password'"
        v-model="userPasswords.oldPassword"
        required
      >
        <template #suffix>
          <button type="button" @click="passwordVisible = !passwordVisible">
            <SfIconVisibility />
          </button>
        </template>
      </SfInput>
    </label>
    <label class="block my-4">
      <UiFormLabel>{{
        $t('account.accountSettings.personalData.newPassword')
      }}</UiFormLabel>
      <SfInput
        name="password"
        :type="firstNewPasswordVisible ? 'text' : 'password'"
        v-model="userPasswords.firstNewPassword"
        required
      >
        <template #suffix>
          <button
            type="button"
            @click="firstNewPasswordVisible = !firstNewPasswordVisible"
          >
            <SfIconVisibility />
          </button>
        </template>
      </SfInput>
      <UiFormHelperText class="block">
        {{
          $t('account.accountSettings.personalData.passwordHelp')
        }}</UiFormHelperText
      >
    </label>
    <label class="block">
      <UiFormLabel>{{
        $t('account.accountSettings.personalData.newPasswordAgain')
      }}</UiFormLabel>
      <SfInput
        name="password"
        :type="secondNewPasswordVisible ? 'text' : 'password'"
        v-model="userPasswords.secondNewPassword"
        required
      >
        <template #suffix>
          <button
            type="button"
            @click="secondNewPasswordVisible = !secondNewPasswordVisible"
          >
            <SfIconVisibility />
          </button>
        </template>
      </SfInput>
    </label>
    <div class="mt-6 flex flex-col-reverse md:flex-row md:justify-end gap-4">
      <SfButton type="reset" variant="secondary" @click="$emit('on-cancel')">
        {{ $t('contactInfo.cancel') }}
      </SfButton>
      <SfButton type="submit" class="min-w-[120px]">
        {{ $t('account.accountSettings.personalData.changePassword') }}
      </SfButton>
    </div>
  </form>
</template>
<script lang="ts" setup>
import { SfButton, SfInput, SfIconVisibility } from '@crearis/vue';

type AccountFormsPasswordProps = {
  oldPassword?: string;
  firstNewPassword?: string;
  secondNewPassword?: string;
};

const props = defineProps<AccountFormsPasswordProps>();
const { oldPassword, firstNewPassword, secondNewPassword } = toRefs(props);
defineEmits(['on-save', 'on-cancel']);
const userPasswords = ref({
  oldPassword: oldPassword?.value ?? '',
  firstNewPassword: firstNewPassword?.value ?? '',
  secondNewPassword: secondNewPassword?.value ?? '',
});

const passwordVisible = ref(false);
const firstNewPasswordVisible = ref(false);
const secondNewPasswordVisible = ref(false);
</script>
