import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Article } from '../../Types/types';
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

const ArticlesApi = createApi({
    reducerPath: 'ArticlesApi',
    baseQuery: baseQueryWithToken,
    endpoints: (builder) => ({
        fetchArticlesFeedData: builder.query<Article[], void>({
            query: () => '/articles/feed',
        }),

        fetchArticlesData: builder.query<Article[], void>({ // Ensure this endpoint returns an array of articles
            query: () => '/articles/',
            transformResponse: (response: any) => response.articles,
        }),

        fetchOneArticleData: builder.query<Article, string>({
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
    useFetchOneArticleDataQuery,
    useFetchArticlesDataQuery,
    usePostArticleDataMutation,
    useUpdateArticleDataMutation,
    useDeleteArticleDataMutation,
} = ArticlesApi;

export { ArticlesApi };
