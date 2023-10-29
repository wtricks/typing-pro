import { createSlice } from "@reduxjs/toolkit";
import { getDataFromLocalStorage, setDataToLocalStorage } from '../utils'

export const Account = createSlice({
    name: 'account',
    initialState: getDataFromLocalStorage('account', []),
    reducers: {
        create: (state, { payload }) => {
            state.push(payload)
            setDataToLocalStorage('account', state)
        }
    }
})

export const { create } = Account.actions
export default Account.reducer