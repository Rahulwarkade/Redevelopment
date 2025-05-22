import { createSlice } from "@reduxjs/toolkit";
import { getCountries, getCountryById, } from "./userAPI";
import { Country } from "@/types/custom";

interface CountryState {
  countries: Country[];
  selectedCountry: Country | null;
  loading: boolean;
}

const initialState: CountryState = {
  countries: [],
  selectedCountry: null,
  loading: false,
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    setSelectedCountry(state, action) {
      state.selectedCountry = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.countries = action.payload?.data;
        state.loading = false;
      })
      .addCase(getCountries.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getCountryById.fulfilled, (state, action) => {
        state.selectedCountry = action.payload;
      });
  },
});

export const { setSelectedCountry } = countrySlice.actions;
export default countrySlice.reducer;