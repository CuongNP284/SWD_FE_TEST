import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
    openSections: { [key: string]: boolean };
    openApiDetails: { [key: string]: boolean };
  }
  
  const initialState: SidebarState = {
    openSections: {},
    openApiDetails: {},
  };
  
  const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
      toggleSection: (state, action: PayloadAction<string>) => {
        const section = action.payload;
        state.openSections[section] = !state.openSections[section];
      },
      toggleApiDetails: (state, action: PayloadAction<string>) => {
        const api = action.payload;
        state.openApiDetails[api] = !state.openApiDetails[api];
      },
    },
  });

export const { toggleSection, toggleApiDetails } = sidebarSlice.actions;
export default sidebarSlice.reducer;
