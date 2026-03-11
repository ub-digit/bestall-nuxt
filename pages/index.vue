<script setup lang="ts">
definePageMeta({});
const runtimeConfig = useRuntimeConfig();

const localePath = useLocalePath();
if (runtimeConfig.public.applicationIsClosed) {
  navigateTo(localePath("/closed"));
}
</script>

<template>
  <div>
    <h2>DEBUG</h2>
    <p>
      Sökdatorer skall komma till beställ med ?view=46GUB_KOHA och detta skall
      gömma GU-INLOGGNING. Användaren skall oxå kunna komma till beställ med
      rätt språk valt.
    </p>

    <ul>
      <li>
        <NuxtLink
          :to="
            $localePath({
              path: '/1063720',
              query: { view: '46GUB_KOHA' },
            })
          "
          >Länk till id 1063720 från en sökdator</NuxtLink
        >
      </li>

      <li>
        <NuxtLink
          :to="
            $localePath({
              path: '/1063720',
              query: { view: '46GUB_KOHA', language: 'eng' },
            })
          "
          >Länk till id 1063720 från en sökdator till engelska</NuxtLink
        >
      </li>

      <li>
        <NuxtLink
          :to="
            $localePath({
              path: '/1063720',
              query: { view: '46GUB_VU1' },
            })
          "
          >Länk till id 1063720 från icke sökdator</NuxtLink
        >
      </li>

      <li>
        <NuxtLink
          :to="
            $localePath({
              path: '/1063720',
              query: { view: '46GUB_VU1', language: 'eng' },
            })
          "
          >Länk till id 1063720 från icke sökdator till engelska</NuxtLink
        >
      </li>

      <li>
        <NuxtLink :to="$localePath('/login')"
          >Direkt till inloggningsidan
        </NuxtLink>
      </li>
    </ul>

    <NuxtPage />
  </div>
</template>

<style scoped></style>
