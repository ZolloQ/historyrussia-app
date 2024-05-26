import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
	reducerPath: "auth",
	baseQuery: fetchBaseQuery({
		prepareHeaders: (headers) => {
			if (localStorage.getItem("token")) {
				headers.set(
					"Authorization",
					`Bearer ${localStorage.getItem("token")}`,
				);
			}
			headers.set("Content-Type", "application/json");
			return headers;
		},
	}),
	tagTypes: ['Token'],
	endpoints: (builder) => ({
		getAuthorization: builder.mutation({
			query: ({ email, password }) => ({
				url: "/auth",
				method: "POST",
				body: { email, password },
			}),
			invalidatesTags: ['Token']
		}),
		getRegistration: builder.mutation({
			query: ({ uname, email, pasw, role }) => ({
				url: "/auth/signup",
				method: "POST",
				body: { uname, email, pasw, role },
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: "/auth/logout",
				method: "POST",
			}),
			invalidatesTags: ['Token']
		}),
	}),
});

export const {
	useGetAuthorizationMutation,
	useGetRegistrationMutation,
	useLogoutMutation,
} = apiSlice;