import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./slices/ContactsSlice";
import itemsReducer from "./slices/ItemsSlice";
import invoiceReducer from "./slices/InvoiceSlice";
import purchaseOrdersReducer from "./slices/purchaseOrdersSlice";

// Configure the store
const Store = configureStore({
  reducer: {
    contacts: contactsReducer,
    items: itemsReducer,
    invoice: invoiceReducer,
    purchaseOrders: purchaseOrdersReducer,
  },
});

// Export types for the RootState and AppDispatch
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
