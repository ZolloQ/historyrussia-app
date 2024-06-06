import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { MaterialProps } from '../../components/Material/Material.props.ts'
import type { IQuiz } from '../../interfaces/Quiz.interfaces.ts'

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
		getMaterial: builder.query<MaterialProps, string | void>({
			query: (id)  => ({
				url: `/quiz/card/${id}`,
				method: 'GET',
			}),
		}),
		getQuiz: builder.query<IQuiz, string | void>({
			query: (id) => ({
				url: `/quiz/${id}`,
				method: 'GET',
			}),
		}),
		deleteCard: builder.mutation({
			query: (id) => ({
				url: "/admin/card/delete",
				method: "POST",
				body: { id },
			}),
		}),
		postSaveResult: builder.mutation({
			query: ({ quiz, correct, estimation, percentage }) => ({
				url: "/quiz/save",
				method: "POST",
				body: { correct, estimation, percentage, quiz },
			}),
		}),
		getResult: builder.query({
			query: (id) => ({
				url: `/quiz/top/${id}`,
				method: "GET",
			}),
		})
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
	useGetQuizQuery,
	useDeleteCardMutation,
	usePostSaveResultMutation,
	useGetResultQuery,
} = apiSlice;

