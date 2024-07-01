import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Article, ArticleResponse, NewArticle } from '../../Types/types';
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
        fetchArticlesFeedData: builder.query<{ articles: Article[], articlesCount: number }, { page: number }>({
            query: ({ page }) => `/articles/feed?limit=10&offset=${(page - 1) * 10}`,
            transformResponse: (response: any) => response,
        }),

        fetchArticlesData: builder.query<{ articles: Article[], articlesCount: number }, { page: number }>({
            query: ({ page }) => `/articles?limit=10&offset=${(page - 1) * 10}`,
            transformResponse: (response: any) => response,
        }),

        fetchArticlesByTag: builder.query<Article[], string | null>({
            query: (tag) => tag ? `/articles?tag=${tag}` : '',
            transformResponse: (response: any) => response.articles,
        }),
        fetchFavoritedArticles: builder.query<{ articles: Article[], articlesCount: number }, { username: string, page: number }>({
            query: ({ username, page }) => `/articles?favorited=${username}&limit=10&offset=${(page - 1) * 10}`,
            transformResponse: (response: any) => response,
        }),

        fetchOneArticleData: builder.query<Article, string>({
            query: (slug) => `/articles/${slug}`,
            transformResponse: (response: any) => response.article,
        }),

        postArticleData: builder.mutation<ArticleResponse, { article: NewArticle }>({
            query: (newArticle) => ({
                url: '/articles',
                method: 'POST',
                body: newArticle,
            }),
        }),

        updateArticleData: builder.mutation<Article, { slug: string; article: Partial<Article> }>({
            query: ({ slug, article }) => ({
                url: `/articles/${slug}`,
                method: 'PUT',
                body: { article },
            }),
            transformResponse: (response: any) => response.article,
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
    useFetchArticlesByTagQuery,
    useFetchFavoritedArticlesQuery,
} = ArticlesApi;

export { ArticlesApi };









