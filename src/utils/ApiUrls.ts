export const ApiUrl = (endpoint: string, id?: string) =>
  `${process.env.NEXT_PUBLIC_API_URL}${endpoint}${id ? `/${id}` : ""}`;

export const GET_CONTACTS = ApiUrl("Contacts");
export const GET_ITEMS = ApiUrl("Items");
export const GET_ITEM = (id: string) => ApiUrl("Items", id);
export const POST_INVOICE = ApiUrl("Invoices");
export const FETCH_PURCHASE_ORDERS = ApiUrl("PurchaseOrders");
export const POST_PURCHASE_ORDER = ApiUrl("PurchaseOrders");
