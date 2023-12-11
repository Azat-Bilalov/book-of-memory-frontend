import { RootState } from "@/app/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    session: null,
  },
  reducers: {
    setSession: (state: RootState, action: PayloadAction) => {
      state.session = action.payload;
    },
    logout: ()
  },
});

export const { setSession } = sessionSlice.actions;

export default sessionSlice.reducer;
