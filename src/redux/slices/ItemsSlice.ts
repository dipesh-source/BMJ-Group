// redux/itemsSlice.ts
import { GET_ITEMS } from "@/utils/ApiUrls";
import axiosInstance from "@/utils/axiosInstance";
import { Token } from "@/utils/Token";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Item {
  PurchaseDescription: any;
  ItemID: string;
  Name: string;
}

interface ItemsState {
  items: Item[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchItems = createAsyncThunk<
  Item[],
  void,
  { rejectValue: string }
>("items/fetchItems", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance<{ Items: Item[] }>({
      method: "GET",
      url: "/Items",
    });
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
const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch items";
      });
  },
});

export default itemsSlice.reducer;
