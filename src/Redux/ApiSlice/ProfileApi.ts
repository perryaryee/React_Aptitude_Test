import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Profile } from '../../Types/types';

const baseUrl = 'https://api.realworld.io/api';


const ProfilesApi = createApi({
    reducerPath: 'ProfilesApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getProfile: builder.query<Profile, string>({
            query: (username) => `/profiles/${username}`,
        }),

        followUser: builder.mutation<Profile, string>({
            query: (username) => ({
                url: `/profiles/${username}/follow`,
                method: 'POST',
            }),
        }),

        unfollowUser: builder.mutation<Profile, string>({
            query: (username) => ({
                url: `/profiles/${username}/follow`,
                method: 'DELETE',
            }),
        }),

    }),
});

export const {
    useGetProfileQuery,
    useFollowUserMutation,
    useUnfollowUserMutation,
} = ProfilesApi;

export default ProfilesApi;
