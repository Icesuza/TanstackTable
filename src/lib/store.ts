import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { productsApi } from './api/productApi'
import cartReducer from './features/cartSlice'

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["cart"], 
}

const rootReducer = combineReducers({
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            productsApi.middleware,
        ),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 