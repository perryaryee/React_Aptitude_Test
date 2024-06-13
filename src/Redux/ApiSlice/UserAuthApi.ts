import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../Types/types';

const baseUrl = 'https://api.realworld.io/api';


const UserApi = createApi({
    reducerPath: 'UserApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        loginUser: builder.mutation<User, { email: string; password: string }>({
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
