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
          >Länk till id 1063720 från en sökdator (eng)</NuxtLink
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
          >Länk till id 1063720 från icke sökdator (eng)</NuxtLink
        >
      </li>

      <li>
        <NuxtLink
          :to="$localePath({ path: '/login', query: { view: '46GUB_KOHA' } })"
          >Direkt till inloggningsidan från sökdator
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          :to="$localePath({ path: '/login', query: { language: 'eng' } })"
          >Direkt till inloggningsidan från icke sökdator (eng)</NuxtLink
        >
      </li>

      <li>
        <NuxtLink
          :to="$localePath({ path: '/closed', query: { view: '46GUB_KOHA' } })"
          >Direkt till stängda sidan från sökdator</NuxtLink
        >
      </li>
      <li>
        <NuxtLink
          :to="
            $localePath({
              path: '/closed',
              query: { view: '46GUB_VU1', language: 'eng' },
            })
          "
          >Direkt till stängda sidan från icke sökdator (eng)</NuxtLink
        >
      </li>
      <li>
        <NuxtLink
          :to="$localePath({ path: '/8503', query: { view: '46GUB_KOHA' } })"
          >Direkt till id 8503 - är bok och är endast läsesal. Inga utlånade
          exemplar</NuxtLink
        >
      </li>
    </ul>

    <h3>Subscriptions</h3>
    <ul>
      <li>
        <NuxtLink :to="$localePath('/189763')"
          >Prenumerationer på olika bibliotek</NuxtLink
        >
      </li>
      <li>
        <NuxtLink :to="$localePath('/176500')"
          >Fornvännen. 1 prenumeration på ett bibliotek</NuxtLink
        >
      </li>
      <li>
        <NuxtLink :to="$localePath('/178300')"
          >2 prenumerationer på ett biblioktek</NuxtLink
        >
      </li>
    </ul>

    <h3>Collections</h3>
    <ul>
      <li>
        <NuxtLink
          :to="$localePath({ path: '/2756053', query: { view: '46GUB_KOHA' } })"
          >Direkt till id 2756053 - är collection</NuxtLink
        >
      </li>
    </ul>

    <NuxtPage />
  </div>
</template>

<style scoped></style>
