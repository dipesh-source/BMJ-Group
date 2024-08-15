// redux/invoicesSlice.ts
import { POST_INVOICE } from "@/utils/ApiUrls";
import axiosInstance from "@/utils/axiosInstance";
import { Token } from "@/utils/Token";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the type for the invoice
interface LineItem {
  Description: string;
  Quantity: string;
  UnitAmount: string;
  AccountCode: string;
  DiscountRate: string;
}

interface Invoice {
  Type: string;
  Contact: {
    ContactID: string;
  };
  Date: string;
  DueDate: string;
  DateString: string;
  Status: string;
  DueDateString: string;
  LineAmountTypes: string;
  LineItems: LineItem[];
}

// Define the initial state type
interface InvoicesState {
  invoice: Invoice | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Define the initial state
const initialState: InvoicesState = {
  invoice: null,
  status: "idle",
  error: null,
};

// Async thunk for posting an invoice
export const postInvoice = createAsyncThunk<
  Invoice, // Return type
  Invoice, // Argument type
  { rejectValue: string } // Reject value type
>("invoices/postInvoice", async (invoice, { rejectWithValue }) => {
  try {
    const response = await axiosInstance<{ Invoice: Invoice }>({
      method: "POST",
      url: "/Invoices",
      data: invoice,
    });
    return response.data.Invoice; // Ensure this matches the expected return type
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_NETWORK") {
        //alert(error.message);
      } else if (error.response?.status === 401) {
        //alert("Unauthorized: Please log in again.");
      }
      return rejectWithValue(
        (error.response?.data as string) || "Failed to post invoice"
      );
    }
    return rejectWithValue("An unknown error occurred");
  }
});

// Create the invoices slice
const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postInvoice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        postInvoice.fulfilled,
        (state, action: PayloadAction<Invoice>) => {
          state.status = "succeeded";
          state.invoice = action.payload;
        }
      )
      .addCase(postInvoice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to post invoice";
      });
  },
});

export default invoicesSlice.reducer;
