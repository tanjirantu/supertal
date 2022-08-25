import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../modules/common/types/User';

const initialState: {
    data: null | User;
} = {
    data: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state: typeof initialState, action: PayloadAction<User>) {
            state.data = action.payload;
        },

        removeUser(state: typeof initialState) {
            state.data = null;
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
