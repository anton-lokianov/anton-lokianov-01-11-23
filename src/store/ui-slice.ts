import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  theme: boolean;
}

const initialState: UIState = {
  theme: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = uiSlice.actions;
export default uiSlice.reducer;
