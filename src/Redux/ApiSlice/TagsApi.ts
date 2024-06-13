import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TagsResponse } from '../../Types/types';

const baseUrl = 'https://api.realworld.io/api';



const TagsApi = createApi({
    reducerPath: 'TagsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getTags: builder.query<TagsResponse, void>({
            query: () => '/tags',
        }),
    }),
});

export const {
    useGetTagsQuery,
} = TagsApi;

export default TagsApi;
