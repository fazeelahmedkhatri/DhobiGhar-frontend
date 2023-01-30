import { Alert } from "react-native";
import { api } from ".";
import { setAuthToken } from "../utils/async-storage";
import { ACCESS_TOKEN } from '../constants/index'

export const authApi = api.injectEndpoints({
	endpoints: (builder) => {
		return {
			register: builder.mutation({
				query: (user) => {
					return {
						url: "users/create",
						method: "POST",
						body: {
							...user,
							role: "Consumer",
						},
					};
				},
			}),
			login: builder.mutation({
				query: (body) => ({
					url: "auth/login",
					method: "POST",
					body,
				}),
				async onQueryStarted(_, { queryFulfilled }) {
					try {
						const { data, meta } = await queryFulfilled;
						if (data) {
							const token = data?.data?.access_token;
							await setAuthToken(ACCESS_TOKEN, token);
						}
					} catch (error) {
						Alert.alert("Unauthorized Error", error.message);
					}
				},
			}),
			me: builder.query({
				query: ({ token }) => ({
					url: "auth/me",
					headers: { Authorization: `Bearer ${token}` },
				}),
				async onQueryStarted(_, { queryFulfilled }) {
					try {
						const { data, meta } = await queryFulfilled;
						if (data) {
							const token = data?.data?.access_token;
							await setAuthToken(ACCESS_TOKEN, token);
						}
					} catch (error) {
						Alert.alert("Unauthorized Error", error.message);
					}
				},
			}),
		};
	},
	overrideExisting: true,
});
