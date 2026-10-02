import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Property {
  _id:string ,
  name:string;
  location: string;
  pricePerMonth:string | number;
  priceMin: number;
  priceMax: number;
  beds: number;
  baths: number;
  propertyType: string;
  squareFeetMin: number;
  squareFeetMax: number;
  amenities: string[];
  availableFrom: string | Date;
  favouriteId :string;
  coordinates: {
    latitude: number;
    longitude: number;
  }
}

export interface FiltersState {
  city: string;
  beds: string;
  baths: string;
  propertyType: string;
  amenities: string[];
  availableFrom: string;
  priceRange: [number, number] | [null, null];
  squareFeet: [number, number] | [null, null];
  coordinates: [number , number]| [null, null]
}

interface initialStateTypes{
  filters: FiltersState;
  isFiltersFullOpen:boolean;
  viewMode : "grid" | "list"
}
export const initialState: initialStateTypes= {
  filters: {
  city: "lebanon",
  beds: "any",
  baths: "any",
  propertyType: "any",
  amenities: [],
  availableFrom: "any",
  priceRange: [null, null],
  squareFeet: [null, null],
  coordinates: [null, null]
  },
  isFiltersFullOpen: false,
  viewMode: "grid"
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setFilters: (state, action :PayloadAction<Partial<FiltersState>>) => {
      state.filters = {...state.filters, ...action.payload}
    },
    toggleFiltersFullOpen: (state) => {
      state.isFiltersFullOpen = !state.isFiltersFullOpen;
    },
    setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.viewMode = action.payload
    }
  },
});

export const {setFilters , toggleFiltersFullOpen, setViewMode} = globalSlice.actions;

export default globalSlice.reducer;
