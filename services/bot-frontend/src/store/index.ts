import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from "@reduxjs/toolkit/query";
import {baseApi} from './api';

const createReducer = () => {
    return {
        [baseApi.reducerPath]: baseApi.reducer,
    }
};

const makeStore = () => {
    return configureStore({
        reducer: createReducer(),
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(baseApi.middleware)
        },
        devTools: true,
    });
}

export const store = makeStore();
setupListeners(store.dispatch);

type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
