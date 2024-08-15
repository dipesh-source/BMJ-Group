// redux/itemsSlice.ts
import { GET_ITEM, GET_ITEMS } from "@/utils/ApiUrls";
import axiosInstance from "@/utils/axiosInstance";
import { Token } from "@/utils/Token";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the type for the item
interface Item {
  PurchaseDescription: any;
  ItemID: string;
  Name: string;
  // Add other relevant fields from the API response
}

// Define the initial state type
interface ItemsState {
  item: Item[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Define the initial state
const initialState: ItemsState = {
  item: [],
  status: "idle",
  error: null,
};

export const fetchItem = createAsyncThunk<
  Item[],
  string | undefined,
  { rejectValue: string }
>("items/fetchItems", async (itemId, { rejectWithValue }) => {
  try {
    const url = itemId ? `/Items/${itemId}` : "/Items";
    const response = await axiosInstance<{ Items: Item[] }>({ url });
    return response.data.Items;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_NETWORK") {
        //alert(error.message);
      } else if (error.response?.status === 401) {
        //alert("Unauthorized: Please log in again.");
      }
      return rejectWithValue(
        (error.response?.data as string) || "Failed to fetch items"
      );
    }
    return rejectWithValue("An unknown error occurred");
  }
});

// Create the items slice
const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItem.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.status = "succeeded";
        state.item = action.payload;
      })
      .addCase(fetchItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch items";
      });
  },
});

export default itemSlice.reducer;
