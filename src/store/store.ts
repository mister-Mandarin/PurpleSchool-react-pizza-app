// корневое хранилице на которое вешеются слайсы

import {configureStore} from '@reduxjs/toolkit';
import userSlice from './User.slice.ts';
import {saveState} from './storage.ts';

const store = configureStore({
	reducer: {
		user: userSlice
	}
});

// в случае изменения состояния переписываем состояние
store.subscribe(() => {
	saveState(store.getState().user.jwt, 'jwt-token');
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;