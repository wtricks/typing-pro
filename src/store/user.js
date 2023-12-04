import { createSlice } from '@reduxjs/toolkit'

export const User = createSlice({
    name: 'User',
    initialState: null,
    reducers: {
        setUser(_state, { payload }) {
            return payload
        }
    }
})

export const { setUser } = User.actions
export default User.reducer