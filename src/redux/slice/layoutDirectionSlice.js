import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  direction: "ltr",
  language: "en",
};

const layoutDirectionSlice = createSlice({
  name: "layoutDirection",
  initialState,
  reducers: {
    setDirection: (state, action) => {
      state.direction = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setDirection, setLanguage } = layoutDirectionSlice.actions;
export default layoutDirectionSlice.reducer;
