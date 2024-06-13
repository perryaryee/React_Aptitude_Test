import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Article } from '../../Types/types';

const baseUrl = 'https://api.realworld.io/api';



const FavoriteApi = createApi({
    reducerPath: 'FavoriteApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        favoriteArticle: builder.mutation<Article, string>({
            query: (slug) => ({
                url: `/articles/${slug}/favorite`,
                method: 'POST',
            }),
        }),

        unfavoriteArticle: builder.mutation<Article, string>({
            query: (slug) => ({
                url: `/articles/${slug}/favorite`,
                method: 'DELETE',
            }),
        }),

    }),
});

export const {
    useFavoriteArticleMutation,
    useUnfavoriteArticleMutation,
} = FavoriteApi;

export default FavoriteApi;
