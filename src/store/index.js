import { configureStore } from '@reduxjs/toolkit'

import Auth from './Auth'
import History from './History'
import Theme from './Theme'
import Alert from './Alert'
import Account from './Account'

export const store = configureStore({
    reducer: {
        auth: Auth,
        history: History,
        theme: Theme,
        alert: Alert,
        account: Account
    }
})