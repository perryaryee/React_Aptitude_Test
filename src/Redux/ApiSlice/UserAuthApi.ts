import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginPayload,  User } from '../../Types/types';
import { RootState, selectUserToken } from '../Slice/UserSlice';

const baseUrl = 'https://api.realworld.io/api';

const baseQueryWithToken = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        const token = selectUserToken(getState() as RootState); // Access token from Redux state
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const UserApi = createApi({
    reducerPath: 'UserApi',
    baseQuery: baseQueryWithToken,
    endpoints: (builder) => ({
        loginUser: builder.mutation<User, LoginPayload>({
            query: ({ email, password }) => ({
                url: '/users/login',
                method: 'POST',
                body: { user: { email, password } },
            }),
        }),

        registerUser: builder.mutation<User, Partial<User>>({
            query: (data) => ({
                url: '/users',
                method: 'POST',
                body: { user: data },
            }),
        }),

        getCurrentUser: builder.query<User, void>({
            query: () => '/user',
            transformResponse: (response: any) => response.user,
        }),

        updateCurrentUser: builder.mutation<User, Partial<User>>({
            query: (data) => ({
                url: '/user',
                method: 'PUT',
                body: { user: data },
            }),
        }),

    }),
});

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useGetCurrentUserQuery,
    useUpdateCurrentUserMutation,
} = UserApi;

export default UserApi;
