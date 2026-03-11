<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
const route = useRoute();
const { status, data } = useAuth();
const { locale } = useI18n();

import type { Location } from "~/types/Location";
import type { LoanType } from "~/types/LoanType";
import type { Order } from "~/types/Order";
import type { EventPayload } from "~/types/EventPayload";

const { data: locations, error: locationsError } = await useFetch<Location[]>(
  "/api/locations",
  {
    query: { locale: locale.value },
  },
);

const { data: loanTypes, error: loanTypesError } = await useFetch<LoanType[]>(
  "/api/loantypes",
  {
    query: { locale: locale.value },
  },
);

const { data: biblio, error: biblioError } = await useFetch<any>(
  `/api/biblios/${route.params.id}`,
  { query: { locale: locale.value } },
);
const { order, setOrder, resetOrder } = useOrder();

if (data?.value?.user) {
  setOrder({
    user: data.value.user?.email || "unknown",
  });
} else {
  resetOrder();
}

const handleEvent = (payload: EventPayload) => {
  switch (payload.typeOfEvent) {
    case "joinQueue":
      alert(
        `Join Queue event for Biblio ID: ${payload.biblioId}, Item ID: ${payload.itemId}, Type of Event: ${payload.typeOfEvent}`,
      );
      break;
    case "order":
      setOrder({
        biblio: payload.biblioId,
        item: payload.itemId,
      });
      alert(
        `Order event for Biblio ID: ${payload.biblioId}, Item ID: ${payload.itemId}, Type of Order: ${payload.typeOfEvent}`,
      );
      break;
    case "subscriptionOrder":
      setOrder({
        biblio: payload.biblioId,
        subscription: payload.subscriptionId,
      });
      alert(
        `Subscription Order event for Biblio ID: ${payload.biblioId}, Subscription ID: ${payload.subscriptionId}, Type of Event: ${payload.typeOfEvent}`,
      );
      break;
    default:
      console.warn("Unknown event type:", payload.typeOfEvent);
  }
};
</script>
<template>
  <div>
    <h2>{{ $t("biblio.title") }}</h2>
    <div v-if="locationsError || loanTypesError || biblioError">
      {{ $t("biblio.errorLoadingData") }}
    </div>
    <div v-else class="biblio-card" :data-id="biblio?.id">
      <div class="biblio-card-common">
        <h4>{{ biblio?.title }}</h4>
        <div v-if="biblio?.isbn" class="isbn">
          {{ $t("biblio.isbn", { isbn: biblio?.isbn }) }}
        </div>
        <div v-if="biblio?.edition">
          {{ biblio?.edition }}
        </div>
        <div v-if="biblio?.origin" class="origin">
          {{ biblio?.origin }}
        </div>
      </div>

      <ViewBook
        v-if="biblio?.viewType === 'book'"
        :biblio="biblio"
        @handleEvent="(payload) => handleEvent(payload)"
      />

      <ViewSubscription
        v-else-if="biblio?.viewType === 'subscription'"
        :biblio="biblio"
        @handleEvent="(payload) => handleEvent(payload)"
      />

      <div v-else>
        {{ $t("message.unsupportedViewType", { viewType: biblio?.viewType }) }}
      </div>
    </div>

    <div v-if="$config.public.debugInfo" class="debug">
      <h4>Debug Information</h4>

      <h5>Raw Order</h5>
      <pre class="json-debug">{{ JSON.stringify(order, null, 2) }}</pre>

      <h5>Raw Biblio</h5>
      <pre class="json-debug">{{ JSON.stringify(biblio, null, 2) }}</pre>

      <h5>Raw Locations</h5>
      <pre class="json-debug">{{ JSON.stringify(locations, null, 2) }}</pre>

      <h5>Raw Loantypes</h5>
      <pre class="json-debug">{{ JSON.stringify(loanTypes, null, 2) }}</pre>
    </div>
  </div>
</template>
<style scoped>
.debug {
  margin-top: var(--spacer-32);
  padding: var(--spacer-16);
  border: 1px solid var(--light-base);
  border-radius: var(--spacer-4);
  background-color: var(--lightest-base);
}
.biblio-card {
  max-width: calc(var(--reading-width) * 1.5);
  .biblio-card-common {
    h4 {
      max-width: var(--reading-width);
      margin-bottom: var(--spacer-16);
    }
    margin-bottom: var(--spacer-32);
  }
}
</style>
<style scoped>
.debug {
  margin-top: 10rem;
  .json-debug {
    background: #f6f8fa;
    color: #24292e;
    font-family: "Fira Mono", "Menlo", "Monaco", "Consolas", monospace;
    font-size: 0.5em;
    padding: 1em;
    border-radius: 6px;
    overflow-x: auto;
    white-space: pre-wrap;

    margin-bottom: 1em;
    border: 1px solid #e1e4e8;
  }
}
</style>
