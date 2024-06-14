import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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


const TagsApi = createApi({
    reducerPath: 'TagsApi',
    baseQuery: baseQueryWithToken,
    endpoints: (builder) => ({
        getTags: builder.query<any, void>({
            query: () => '/tags',
            transformResponse: (response: any) => response.tags,
        }),
    }),
});

export const {
    useGetTagsQuery,
} = TagsApi;

export default TagsApi;
