import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { MaterialProps } from '../../components/Material/Material.props.ts'

export const apiSlice = createApi({
	reducerPath: "auth",
	baseQuery: fetchBaseQuery({
		prepareHeaders: (headers,{endpoint}) => {
			console.log(endpoint);
			if (endpoint != "uploadImage"){
				// headers.set('Content-Type', 'multipart/form-data');
				headers.set("Content-Type", "application/json");
			}
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
		uploadImage: builder.mutation({
			query: image => {
				console.log(image);
				console.log(image);
				return {
					url: "/admin/loadpic",
					method: "POST",
					body: (image)
				};
			},
		}),
		postUploadCard: builder.mutation({
			query: (body) => ({
				url: "/admin/card",
				method: "POST",
				body: JSON.stringify(body),
			}),
		}),
		getListCard: builder.mutation({
			query: ()  => ({
				url: '/quiz/card',
				method: 'GET',
			}),
		}),
		getCard: builder.mutation({
			query: (id)  => ({
				url: `/quiz/card/${id}`,
				method: 'GET',
			}),
		}),
		getMaterial: builder.query<MaterialProps, number | void>({
			query: (id)  => ({
				url: `/quiz/card/${id}`,
				method: 'GET',
			}),
		}),
	}),
});

export const {
	useGetAuthorizationMutation,
	useGetRegistrationMutation,
	useLogoutMutation,
	useUploadImageMutation,
	usePostUploadCardMutation,
	useGetListCardMutation,
	useGetCardMutation,
	useGetMaterialQuery,
} = apiSlice;

