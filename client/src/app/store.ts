import { configureStore, ThunkAction, Action, combineReducers, CombinedState } from '@reduxjs/toolkit'
// import counterReducer from "../features/counter/counterSlice";
import { api } from "./serivices/api";
import auth from '../features/auth/authSlice'
import employees from '../features/employees/employeesSlice'
import { listenerMiddleware } from "../middleware/auth";
import { PersistConfig, PersistState } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'


// const persistConfig: PersistConfig<any, any, any, any> = {
//   key: 'root',
//   storage,
// }

// const persistConfig: PersistConfig = {
//   key: 'root',
//   storage,
// }

// type RootState = {
//  any /* определение типа корневого состояния */
// }
// type PersistState = {
//   /* определение типа состояния, которое будет сохранено */
// }
type TransformPartial<State> = (state: State) => Partial<State>

const persistConfig: PersistConfig<any, any, any, TransformPartial<PersistState>> = {
  key: 'root',
  storage,
  // serialize: (data: any) => JSON.stringify(data),
  // deserialize: (data: string) => JSON.parse(data) as PersistState,
}



const rootReducer = combineReducers({
  auth: auth,
  employees: employees,
  [api.reducerPath]: api.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    persistedReducer,
    [api.reducerPath]: api.reducer,
    auth,
    employees,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ignoreActions: (action) => [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER].includes(action.type),
        ignoreActions: true,
      },
    })
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const persistor = persistStore(store)
