import { createSlice } from '@reduxjs/toolkit'
import { getDataFromLocalStorage, setDataToLocalStorage } from '../utils'

export const Theme = createSlice({
    name: 'theme',
    initialState: window.localStorage.getItem("__tp_theme") || 'light',
    reducers: {
        setTheme: (_state, { payload = 'light' }) => {
            setDataToLocalStorage('__tp_theme', payload)
            document.body.classList.remove(payload == 'light' ? 'dark' : 'light')
            document.body.classList.add(payload)
            return payload
        }
    }
})

export const { setTheme } = Theme.actions
export default Theme.reducer
