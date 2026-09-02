import { GetUserProfile } from "./service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { setAuthSessionCookie } from "@/utils/authCookie";
import { getData, saveData } from "@/utils/storage";

export const getUserProfileAction = createAsyncThunk(
    "dashboardSlice/getUerProfileAction",
    async (payload, { rejectWithValue }) => {
      try {
        const result = await GetUserProfile(payload);

        return result.data;
      } catch (err) {
        const message =
          err?.response?.data?.message || err.message || "Something went wrong";
        toast.error(message);
        if (err instanceof AxiosError) {
          return rejectWithValue(err?.response?.data?.message ?? message);
        }
        return rejectWithValue(message);
      }
    }
  );