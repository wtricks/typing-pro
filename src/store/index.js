import { configureStore } from '@reduxjs/toolkit'

import Theme from './Theme'
import Alert from './Alert'
import User from './user'

export const store = configureStore({
    reducer: {
        theme: Theme,
        alert: Alert,
        user: User
    }
})