import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Article } from '../../Types/types';

const baseUrl = 'https://api.realworld.io/api';



const ArticlesApi = createApi({
    reducerPath: 'ArticlesApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        fetchArticlesFeedData: builder.query<Article[], void>({
            query: () => '/articles/feed',
        }),

        fetchArticlesData: builder.query<Article, string>({
            query: (slug) => `/articles/${slug}`,
        }),

        postArticleData: builder.mutation<Article, Partial<Article>>({
            query: (data) => ({
                url: '/articles',
                method: 'POST',
                body: data,
            }),
        }),
        updateArticleData: builder.mutation<Article, { slug: string; data: Partial<Article> }>({
            query: ({ slug, data }) => ({
                url: `/articles/${slug}`,
                method: 'PUT',
                body: data,
            }),
        }),

        deleteArticleData: builder.mutation<void, string>({
            query: (slug) => ({
                url: `/articles/${slug}`,
                method: 'DELETE',
            }),
        }),


    }),
});

export const {
    useFetchArticlesFeedDataQuery,
    useFetchArticlesDataQuery,
    usePostArticleDataMutation,
    useUpdateArticleDataMutation,
    useDeleteArticleDataMutation,
} = ArticlesApi;

export { ArticlesApi };
