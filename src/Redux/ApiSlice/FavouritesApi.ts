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



const FavoriteApi = createApi({
    reducerPath: 'FavoriteApi',
    baseQuery: baseQueryWithToken,
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
