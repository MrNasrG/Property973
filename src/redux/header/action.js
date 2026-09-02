import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";



// export const getUserAction = createAsyncThunk(
//     "dashboardSlice/getUerAction",
//     async (payload, { rejectWithValue }) => {
//       try {
//         const { data, status } = await GetUser(payload);
  
//         return data;
//       } catch (err) {
//         toast.error(err?.response?.data?.message || err.message);
//         if (err instanceof AxiosError) {
//           return rejectWithValue(err?.response?.data?.message);
//         }
//         return rejectWithValue(err.message);
//       }
//     }
//   );