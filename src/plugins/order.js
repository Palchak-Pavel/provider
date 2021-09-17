import OrderID from "@/js/services/orderID";

export default (context, inject) => {

  context.orderID = new OrderID(context);
  inject('orderID', context.orderID);
}
