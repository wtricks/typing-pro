import { createSlice } from "@reduxjs/toolkit";
import { getDataFromLocalStorage, setDataToLocalStorage } from "../utils";

export const History = createSlice({
    name: 'history',
    initialState: getDataFromLocalStorage('history', []),
    reducers: {
        setHistory: (state, { payload }) => {
            state.push(payload)
            setDataToLocalStorage('history', state)
        },
        removeHistory: (state, { payload }) => {
            const index = state.findIndex(el => (el.id == payload))
            if (index == -1) {
                state.splice(index)
                setDataToLocalStorage('history', state)
            }
        }
    }
})

export const { removeHistory, setHistory } = History.actions
export default History.reducer