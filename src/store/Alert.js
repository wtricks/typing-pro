import { createSlice } from '@reduxjs/toolkit'

export const Alert = createSlice({
    name: 'alert',
    initialState: [],
    reducers: {
        alert: (state, { payload }) => {
            const ID = Math.random()
            const DATA = {
                id: ID,
                message: payload,
                class: ''
            }

            state.push(DATA)
        },
        remove: (state, { payload }) => {
            return state.filter(el => el.id != payload)
        }
    }
})

export const { alert, remove } = Alert.actions
export default Alert.reducer