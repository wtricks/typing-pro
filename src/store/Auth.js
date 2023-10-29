import { createSlice } from '@reduxjs/toolkit'
import { getDataFromLocalStorage, removeDataFromLocalStorage, setDataToLocalStorage } from '../utils'

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: getDataFromLocalStorage('user'),
    reducers: {
        signIn: (_state, { payload }) => {
            const data = {
                ...payload,
                loginAt: new Date().getTime()
            }

            setDataToLocalStorage('user', data)
            return data
        },
        signOut: () => {
            removeDataFromLocalStorage('user')
            return null
        }
    }
})

export const { signIn, signOut, addHistory } = AuthSlice.actions

export default AuthSlice.reducer