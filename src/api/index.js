import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
	tagTypes: ["User"],
	baseQuery: fetchBaseQuery({
		baseUrl: `http://192.168.0.142:5000/api/v1/`,
		prepareHeaders: (headers, { getState, endpoint }) => {
			const token = getState().auth.token;
			if (!!token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({}),
});
