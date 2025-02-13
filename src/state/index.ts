import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateTypes {
  test?: []
}

const initialState: InitialStateTypes = {
 test : []
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {

  },
});

export const {
 
} = globalSlice.actions;
export default globalSlice.reducer;