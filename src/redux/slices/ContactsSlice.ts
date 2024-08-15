// redux/contactsSlice.ts
import { GET_CONTACTS } from "@/utils/ApiUrls";
import axiosInstance from "@/utils/axiosInstance";
import { Token } from "@/utils/Token";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ReactNode } from "react";

// Define the type for the contact
interface Contact {
  EmailAddress: ReactNode;
  ContactID: string;
  Name: string;
  // Add other relevant fields from the API response
}

// Define the initial state type
interface ContactsState {
  contacts: Contact[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Define the initial state
const initialState: ContactsState = {
  contacts: [],
  status: "idle",
  error: null,
};

// Async thunk for fetching contacts
export const fetchContacts = createAsyncThunk<
  Contact[],
  void,
  { rejectValue: string }
>("contacts/fetchContacts", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance<{ Contacts: Contact[] }>({
      method: "GET",
      url: "/Contacts",
    });
    return response.data.Contacts;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_NETWORK") {
        //alert(error.message);
      } else if (error.response?.status === 401) {
        //alert("Unauthorized: Please log in again.");
      }
      return rejectWithValue(
        (error.response?.data as string) || "Failed to fetch contacts"
      );
    }
    return rejectWithValue("An unknown error occurred");
  }
});

// Create the contacts slice
const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchContacts.fulfilled,
        (state, action: PayloadAction<Contact[]>) => {
          state.status = "succeeded";
          state.contacts = action.payload;
        }
      )
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch contacts";
      });
  },
});

export default contactsSlice.reducer;
