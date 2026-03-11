<script setup lang="ts">
import type { SubscriptionGroup } from "~/types/Biblio";
import type { EventPayload } from "~/types/EventPayload";
defineProps<{
  subscriptionGroups: SubscriptionGroup[];
  header?: string;
}>();

const emit = defineEmits<{
  (e: "handleEvent", payload: EventPayload): void;
}>();

function handleEvent(payload: EventPayload) {
  emit("handleEvent", payload);
}
</script>
<template>
  <div>
    <h5 class="holdings-header h3">{{ header }}</h5>

    <div
      v-for="subscriptionGroup in subscriptionGroups"
      :key="subscriptionGroup.id"
      class="holdings-grid"
    >
      <div class="holdings-grid-header">{{ $t("table.header.location") }}</div>
      <div class="holdings-grid-header">{{ $t("table.header.holdings") }}</div>
      <div class="holdings-grid-content-location">
        {{ subscriptionGroup.location_name }}
      </div>
      <div class="holdings-grid-content-short-info">
        <ul class="list-unstyled" style="margin-top: 0">
          <li
            v-for="(shortInfo, shortInfoIndex) in subscriptionGroup.short_info"
            :key="shortInfoIndex"
          >
            {{ shortInfo }}
          </li>
        </ul>
      </div>
      <div class="holdings-grid-content-public-note">
        <div
          v-for="(subscription, index) in subscriptionGroup.subscriptions"
          :key="index"
          class="public-note"
        >
          <pre>{{ subscription.public_note }}</pre>
          <div class="action">
            <button
              v-if="subscription.can_be_ordered"
              @click="
                handleEvent({
                  biblioId: subscription.biblio_id,
                  subscriptionId: subscription.id,
                  typeOfEvent: 'subscriptionOrder',
                })
              "
              class="btn-primary"
            >
              {{ $t("actions.order") }}
            </button>
            <div v-else>{{ $t("actions.collect") }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.holdings-header {
  margin-bottom: var(--spacer-16);
}
.holdings-grid {
  display: grid;
  margin-bottom: 1rem;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  .holdings-grid-content-public-note {
    grid-column-start: span 2;
  }
  .holdings-grid-content-public-note {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .public-note {
      pre {
        overflow: scroll;
      }
      background-color: var(--light-light);
      border: 1px solid var(--dark-light);
      padding: 0.5rem;
      border-radius: 4px;
      white-space: pre-wrap;
    }
  }

  .holdings-grid-header {
    font-weight: bold;
    border-bottom: 1px solid var(--dark-light);
    padding-bottom: 0.5rem;
  }
}
</style>
