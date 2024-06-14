import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState, selectUserToken } from '../Slice/UserSlice';

const baseUrl = 'https://api.realworld.io/api';

// Function to fetch and add Authorization token to requests
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


const CommentsApi = createApi({
    reducerPath: 'CommentsApi',
    baseQuery: baseQueryWithToken,
    endpoints: (builder) => ({
        getArticleComments: builder.query<Comment[], string>({
            query: (slug) => `/articles/${slug}/comments`,
            transformResponse: (response: any) => response.comments,
        }),

        createArticleComment: builder.mutation<Comment, { slug: string; body: string }>({
            query: ({ slug, body }) => ({
                url: `/articles/${slug}/comments`,
                method: 'POST',
                body: { comment: { body } },
            }),
        }),

        deleteArticleComment: builder.mutation<void, { slug: string; id: number }>({
            query: ({ slug, id }) => ({
                url: `/articles/${slug}/comments/${id}`,
                method: 'DELETE',
            }),
        }),

    }),
});

export const {
    useGetArticleCommentsQuery,
    useCreateArticleCommentMutation,
    useDeleteArticleCommentMutation,
} = CommentsApi;

export default CommentsApi;
