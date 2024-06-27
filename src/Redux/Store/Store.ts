import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Default storage for redux-persist is local storage
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "../Slice/UserSlice";
import { ArticlesApi } from "../ApiSlice/ArticlesApi";
import CommentsApi from "../ApiSlice/CommentsApi";
import TagsApi from "../ApiSlice/TagsApi";
import FavoriteApi from "../ApiSlice/FavouritesApi";
import ProfilesApi from "../ApiSlice/ProfileApi";
import UserAuthApi from "../ApiSlice/UserAuthApi";

// Configuring redux-persist
const persistConfig = {
    key: 'root', // Key for local storage
    storage, // Storage engine
    blacklist: [ArticlesApi.reducerPath, CommentsApi.reducerPath, TagsApi.reducerPath, TagsApi.reducerPath, FavoriteApi.reducerPath, ProfilesApi.reducerPath],
};

// Combining all reducers
const rootReducer = combineReducers({
    user: userReducer, // User slice reducer
    [ArticlesApi.reducerPath]: ArticlesApi.reducer,
    [CommentsApi.reducerPath]: CommentsApi.reducer,
    [TagsApi.reducerPath]: TagsApi.reducer,
    [FavoriteApi.reducerPath]: FavoriteApi.reducer,
    [ProfilesApi.reducerPath]: ProfilesApi.reducer,
    [UserAuthApi.reducerPath]: UserAuthApi.reducer,
});

// Applying persistReducer to the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Defining RootState type for the Redux store
export type RootState = ReturnType<typeof rootReducer>;

// Configuring the Redux store
const store = configureStore({
    reducer: persistedReducer, // Use the persisted reducer
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable check for redux-persist compatibility
        }).concat(
            ArticlesApi.middleware,
            CommentsApi.middleware,
            TagsApi.middleware,
            FavoriteApi.middleware,
            ProfilesApi.middleware,
            UserAuthApi.middleware,
        ),
});

// Creating a persistor object for persisting the store
export const persistor = persistStore(store);

// Exporting the configured store
export default store;
