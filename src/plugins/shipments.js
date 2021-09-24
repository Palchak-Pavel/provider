import ShipmentsID from "@/js/services/shipmentsID";

export default (context, inject) => {
  context.shipmentsID = new ShipmentsID(context);
  inject('shipmentsID', context.shipmentsID);
}


