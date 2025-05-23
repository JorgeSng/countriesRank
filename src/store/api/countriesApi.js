import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const countriesApi = createApi({
  reducerPath: "countries",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://restcountries.com/v3.1",
  }),
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => "/all?sort=population",
    }),
    getCountryByCountryCode: builder.query({
      query: (countryCode) => `/alpha/${countryCode}`,
    }),
  }),
});

export const { useGetCountriesQuery, useGetCountryByCountryCodeQuery } =
  countriesApi;