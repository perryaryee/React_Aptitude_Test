import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    username: string;
    email: string;
    token: string
}

interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        Add_User: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        ClearUser: (state) => {
            state.user = null;
        },
    },
});

export const { Add_User, ClearUser } = userSlice.actions;

export type RootState = {
    user: UserState;
};

export const selectUserToken = (state: RootState) => state.user?.user?.token;


export default userSlice.reducer;