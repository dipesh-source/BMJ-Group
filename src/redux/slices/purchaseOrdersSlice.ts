import { FETCH_PURCHASE_ORDERS, POST_PURCHASE_ORDER } from "@/utils/ApiUrls";
import axiosInstance from "@/utils/axiosInstance";
import { Token } from "@/utils/Token";
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  current,
} from "@reduxjs/toolkit";
import axios from "axios";

// Define the type for the request body
interface PurchaseOrderRequest {
  PurchaseOrderNumber: string;
  Date: string;
  DeliveryDate: string;
  Reference: string;
  Contact: { ContactID: string };
  BrandingThemeID: string;
  Status: string;
  LineAmountTypes: string;
  LineItems: {
    ItemCode: string;
    Description: string;
    UnitAmount: number;
    TaxType: string;
    AccountCode: string;
    Tracking: { Name: string; Option: string }[];
    Quantity: number;
    DiscountRate: number;
  }[];
  CurrencyRate: number;
  CurrencyCode: string;
  DeliveryAddress: string;
  AttentionTo: string;
  Telephone: string;
  DeliveryInstructions: string;
  ExpectedArrivalDate: string;
}

// Define the types for the purchase order data
interface LineItem {
  ItemCode: string;
  Description: string;
  UnitAmount: number;
  TaxType: string;
  TaxAmount: number;
  LineAmount: number;
  AccountCode: string;
  Tracking: any[];
  Quantity: number;
  LineItemID: string;
  DiscountRate?: number;
}

interface Contact {
  ContactID: string;
  ContactStatus: string;
  Name: string;
  FirstName: string;
  LastName: string;
  Addresses: any[];
  Phones: any[];
  UpdatedDateUTC: string;
  ContactGroups: any[];
  DefaultCurrency: string;
  ContactPersons: any[];
  HasValidationErrors: boolean;
}

interface PurchaseOrder {
  [x: string]: any;
  PurchaseOrderID: string;
  PurchaseOrderNumber: string;
  DateString: string;
  Date: string;
  DeliveryDateString: string;
  DeliveryDate: string;
  DeliveryAddress: string;
  AttentionTo: string;
  Telephone: string;
  DeliveryInstructions: string;
  HasErrors: boolean;
  IsDiscounted: boolean;
  Reference: string;
  Type: string;
  CurrencyRate: number;
  CurrencyCode: string;
  Contact: Contact;
  BrandingThemeID: string;
  Status: string;
  LineAmountTypes: string;
  LineItems: LineItem[];
  SubTotal: number;
  TotalTax: number;
  Total: number;
  UpdatedDateUTC: string;
  HasAttachments: boolean;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  itemCount: number;
}

interface PurchaseOrdersResponse {
  Id: string;
  Status: string;
  ProviderName: string;
  DateTimeUTC: string;
  pagination: Pagination;
  PurchaseOrders: PurchaseOrder[];
}

// Define the initial state type
interface PurchaseOrdersState {
  purchaseOrdersRes?: PurchaseOrdersResponse;
  cartItems: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  fetchOrderStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | {};
}
interface PurchaseOrdersResponse {
  Id: string;
  ProviderName: string;
  purchaseOrders: PurchaseOrder[];
  totalCost: number;
  totalItems: number;
  TotalTax: number;
}
// Define the initial state
const initialState: PurchaseOrdersState = {
  // purchaseOrders: {},
  status: "idle",
  fetchOrderStatus: "idle",
  error: null,
  cartItems: [],
};

// Async thunk for fetching purchase orders
export const fetchPurchaseOrders = createAsyncThunk<
  PurchaseOrder[],
  void,
  { rejectValue: string }
>(
  "purchaseOrders/fetchPurchaseOrders",
  async (_: any, { rejectWithValue }: any) => {
    try {
      const response = await axiosInstance<PurchaseOrdersResponse>({
        method: "GET",
        url: "/PurchaseOrders",
      });
      const totals = await response?.data?.PurchaseOrders?.reduce(
        (acc: any, item: any) => ({
          totalItems: acc?.totalItems + item.LineItems?.length ?? 0,
          totalCost: acc?.totalCost + item.Total,
        }),
        { totalItems: 0, totalCost: 0 }
      );
      return { ...response?.data, ...totals };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          //alert(error.message);
        } else if (error.response?.status === 401) {
          //alert("Unauthorized: Please log in again.");
        }
        return rejectWithValue(
          (error.response?.data as string) || "Failed to fetch purchase orders"
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Async thunk for posting a new purchase order
export const postPurchaseOrder = createAsyncThunk<
  PurchaseOrder,
  PurchaseOrderRequest,
  { rejectValue: string }
>(
  "purchaseOrders/postPurchaseOrder",
  async (purchaseOrderData: any, { rejectWithValue }: any) => {
    try {
      const response = await axiosInstance<PurchaseOrder>({
        url: "/PurchaseOrders",
        data: purchaseOrderData,
        method: "POST",
      });

      return response?.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          //alert(error.message);
        } else if (error.response?.status === 401) {
          //alert("Unauthorized: Please log in again.");
        }
        return rejectWithValue(
          (error.response?.data as string) || "Failed to post purchase order"
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Create the purchase orders slice
const purchaseOrdersSlice = createSlice({
  name: "purchaseOrders",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const currentState = current(state);
      const newItem = action.payload;
      const existingCartItem = currentState?.cartItems?.find(
        (item) => item.ItemID === newItem?.ItemID
      );
      let newCartItems = [];
      if (existingCartItem) {
        newCartItems = currentState?.cartItems?.map((item: any) => {
          if (newItem?.ItemID === item?.ItemID) {
            return {
              ...item,
              quantity: item?.quantity + 1,
            };
          } else {
            return item;
          }
        });
      } else {
        // @ts-ignore
        newCartItems = [...state?.cartItems, { ...newItem, quantity: 1 }];
      }
      state.cartItems = newCartItems;
    },
    changeProductQuantity: (state, action) => {
      const currentState = current(state);
      const { productId, quantity } = action?.payload;
      const newCartItems = currentState?.cartItems?.map((item: any) => {
        if (item?.ItemID === productId) {
          return {
            ...item,
            quantity: quantity,
          };
        } else {
          return item;
        }
      });
      state.cartItems = newCartItems;
    },
    emptyCart: (state, action) => {
      state.cartItems = [];
    },
  },

  extraReducers: (builder) => {
    // @ts-ignore
    builder
      .addCase(fetchPurchaseOrders.pending, (state) => {
        state.fetchOrderStatus = "loading";
      })
      // @ts-ignore
      .addCase(
        fetchPurchaseOrders.fulfilled,
        (state, action: PayloadAction<PurchaseOrdersResponse>) => {
          state.fetchOrderStatus = "succeeded";
          state.purchaseOrdersRes = action.payload;
        }
      )
      .addCase(fetchPurchaseOrders.rejected, (state, action) => {
        state.fetchOrderStatus = "failed";
        state.error = action.payload || "Failed to fetch purchase orders";
      })
      .addCase(postPurchaseOrder.pending, (state) => {
        state.status = "loading";
      })
      // @ts-ignore
      .addCase(
        postPurchaseOrder.fulfilled,
        (state, action: PayloadAction<PurchaseOrdersResponse>) => {
          state.status = "succeeded";
          // @ts-ignore
          state.purchaseOrdersRes?.PurchaseOrders?.push(action.payload);
        }
      )
      .addCase(postPurchaseOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to post purchase order";
      });
  },
});

export const { addProductToCart, changeProductQuantity, emptyCart } =
  purchaseOrdersSlice.actions;
export default purchaseOrdersSlice.reducer;
