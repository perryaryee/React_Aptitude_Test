import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { ArticlesApi } from "../ApiSlice/ArticlesApi";
import CommentsApi from "../ApiSlice/CommentsApi";
import TagsApi from "../ApiSlice/TagsApi";
import FavoriteApi from "../ApiSlice/FavouritesApi";
import ProfilesApi from "../ApiSlice/ProfileApi";
import UserAuthApi from "../ApiSlice/UserAuthApi";

const reducers = combineReducers({
    [ArticlesApi.reducerPath]: ArticlesApi.reducer,
    [CommentsApi.reducerPath]: CommentsApi.reducer,
    [TagsApi.reducerPath]: TagsApi.reducer,
    [FavoriteApi.reducerPath]: FavoriteApi.reducer,
    [ProfilesApi.reducerPath]: ProfilesApi.reducer,
    [UserAuthApi.reducerPath]: UserAuthApi.reducer,
});

export type RootState = ReturnType<typeof reducers>;

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            ArticlesApi.middleware,
            CommentsApi.middleware,
            TagsApi.middleware,
            FavoriteApi.middleware,
            ProfilesApi.middleware,
            UserAuthApi.middleware
        ),
});

export default store;
