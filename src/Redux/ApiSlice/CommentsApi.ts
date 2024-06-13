import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://api.realworld.io/api';


const CommentsApi = createApi({
    reducerPath: 'CommentsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getArticleComments: builder.query<Comment[], string>({
            query: (slug) => `/articles/${slug}/comments`,
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
