// корневое хранилице на которое вешеются слайсы

import {configureStore} from '@reduxjs/toolkit';
import userSlice from './User.slice.ts';
import {saveState} from './storage.ts';
import cartSlice from './Cart.slice.ts';

const store = configureStore({
	reducer: {
		user: userSlice,
		cart: cartSlice
	}
});

// в случае изменения состояния переписываем состояние
store.subscribe(() => {
	saveState(store.getState().user.jwt, 'jwt-token');
	saveState(store.getState().cart.items, 'cart');
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;