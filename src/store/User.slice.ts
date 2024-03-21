import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import loadState from './storage.ts';
import axios from 'axios';
import {LoginResponse} from '../interfaces/auth.interface.ts';
import {PREFIX} from '../helpers/API.ts';

export interface userSliceProps {
    jwt: string | null;
}

const initialState: userSliceProps = {
	// при загрузке загружаем функцией значение по ключу из локалстореджа
	jwt: loadState('jwt-token') ?? null
};

export const login = createAsyncThunk(
	'user/login', // это название
	async (params: string) => {
		const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
			email: params,
			password: params
		});
		return data;
	}
);

export const userSlice = createSlice({
	// название слайса
	name: 'user',
	initialState,
	reducers: {
		// вместо addJwt сделали первый extraReducers
		// addJwt: (state, action: PayloadAction<string>) => {
		// 	state.jwt = action.payload;
		// },
		logout: (state) => {
			state.jwt = null;
		}
	},
	// свойство через которое можно устанавливать реакцию (редьюсеры) на внешние действия
	// builder.addCase стандартный вызов. Дальше функция и состояние.
	// Короче после выполенния А нужно выполнить действие Б
	extraReducers: builder => {
		//fulfilled - в результате выполнения функции успешно все отработало
		builder.addCase(login.fulfilled,
			(state, action: PayloadAction<LoginResponse>) => {
				state.jwt = action.payload.access_token;
			});

	}
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
