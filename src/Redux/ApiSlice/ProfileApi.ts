import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { Profile } from '../../Types/types';
import { RootState, selectUserToken } from '../Slice/UserSlice';

const baseUrl = 'https://api.realworld.io/api';

export interface Profile {
    username: string;
    bio: string;
    image: string;
    following: boolean;
}


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



const ProfilesApi = createApi({
    reducerPath: 'ProfilesApi',
    baseQuery: baseQueryWithToken,
    endpoints: (builder) => ({
        getProfile: builder.query<Profile, string>({
            query: (username) => `/profiles/${username}`,
            transformResponse: (response: any) => response.profile,
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
