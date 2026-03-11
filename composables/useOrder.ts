import type { Order } from "~/types/Order";

export const useOrder = () => {
  const order = useState<Order>(
    "order",
    () =>
      ({
        user: "",
        location: "",
        loanType: "",
        biblio: "",
        item: "",
        subscription: "",
        reserveNotes: "",
        queuePosition: "",
        isReservedClicked: false,
      }) as Order,
  );

  /**
   * Updates the order state with the provided partial data.
   * @param data - Partial order object containing the properties to update
   */
  const setOrder = (data: Partial<Order>) => {
    Object.assign(order.value, data);
  };

  const resetOrder = () => {
    order.value = {} as Order;
  };

  return {
    order,
    setOrder,
    resetOrder,
  };
};
