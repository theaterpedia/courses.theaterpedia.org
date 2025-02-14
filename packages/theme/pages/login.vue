<script lang="ts" setup>
import {
  SfButton,
  SfLink,
  SfCheckbox,
  SfInput,
  SfLoaderCircular,
} from '@crearis/vue';

definePageMeta({
  layout: false,
});

const NuxtLink = resolveComponent('NuxtLink');

const router = useRouter();

const email = ref('');
const password = ref('');
const rememberMe = ref<boolean>();
const isLoading = ref<boolean>();

const login = () => {
  isLoading.value = true;
  // mimics waiting an async api call
  setTimeout(() => {
    void router.push('/').then(() => (isLoading.value = false));
  }, 4000);
};
</script>

<template>
  <div>
    <NuxtLayout name="auth" :heading="$t('auth.login.heading')">
      <form
        @submit.prevent="login"
        class="border-neutral-200 md:border flex flex-col gap-4 md:p-6 rounded-md"
      >
        <label>
          <FormLabel>{{ $t('form.emailLabel') }}</FormLabel>
          <SfInput
            name="email"
            type="email"
            autocomplete="email"
            v-model="email"
            required
          />
        </label>

        <label>
          <FormLabel>{{ $t('form.passwordLabel') }}</FormLabel>
          <FormPasswordInput
            name="password"
            autocomplete="current-password"
            v-model="password"
            required
          />
        </label>

        <label class="mt-2 flex items-center gap-2">
          <SfCheckbox name="rememberMe" v-model="rememberMe" />
          {{ $t('auth.login.rememberMeLabel') }}
        </label>

        <SfButton type="submit" class="mt-2" :disabled="isLoading">
          <SfLoaderCircular
            v-if="isLoading"
            class="flex justify-center items-center"
            size="base"
          />
          <span v-else>
            {{ $t('auth.login.submitLabel') }}
          </span>
        </SfButton>
        <SfButton :tag="NuxtLink" to="/reset-password" variant="tertiary">
          {{ $t('auth.login.forgotPasswordLabel') }}
        </SfButton>
      </form>

      <UiAlert
        class="mt-6 w-full p-4 md:p-6 !justify-start typography-text-base"
        variant="neutral"
      >
        <i18n-t tag="span" keypath="auth.login.createAccountBanner" scope="global">
          <SfLink :tag="NuxtLink" to="/signup" variant="primary">
            {{ $t('auth.login.createAccountLinkLabel') }}
          </SfLink>
        </i18n-t>
      </UiAlert>
    </NuxtLayout>
  </div>
</template>
