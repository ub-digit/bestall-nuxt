type EventPayload = {
  biblioId: string;
  itemId?: string;
  subscriptionId?: string;
  typeOfEvent: "joinQueue" | "order" | "subscriptionOrder";
};

export type { EventPayload };
