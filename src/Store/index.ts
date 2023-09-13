import { configureStore, Middleware } from "@reduxjs/toolkit";

import userReducer from "./User/slice";

const syncWithDatabaseMiddleware: Middleware =
    (store) => (next) => (action) => {
        const { type, payload } = action;

        next(action);

        switch (type) {
            case "user/setUserInfo": {
                // TODO: sync with database

                break;
            }

            default:
                break;
        }
    };

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: [syncWithDatabaseMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
