import LeftoversID from "@/js/services/leftoversID";

export default (context, inject) => {
  context.leftoversID = new LeftoversID(context);
  inject('leftoversID', context.leftoversID);
}
