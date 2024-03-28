import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import loadState from './storage.ts';
import axios, {AxiosError} from 'axios';
import {LoginResponse} from '../interfaces/auth.interface.ts';
import {PREFIX} from '../helpers/API.ts';
import {Profile} from '../interfaces/user.interface.ts';
import {RootState} from './store.ts';

export interface userSliceProps {
    jwt: string | null;
    loginErrorMessage?: string;
    registerErrorMessage?: string;
    profile?: Profile;
}

const initialState: userSliceProps = {
	// при загрузке загружаем функцией значение по ключу из локалстореджа
	jwt: loadState('jwt-token') ?? null
};

export const login = createAsyncThunk(
	'user/login', // это название
	async (params: { email: string, password: string }) => {
		try {
			const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
				email: params.email,
				password: params.password
			});
			return data;
		} catch (err) {
			if (err instanceof AxiosError) {
				throw new Error(err.response?.data.message);
			}
		}
	}
);

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>(
	'user/profile', // это название
	async (_, thunkAPI) => {
		const jwt = thunkAPI.getState().user.jwt;
		const {data} = await axios.get<LoginResponse>(`${PREFIX}/user/profile`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});
		return data;
	}
);

export const register = createAsyncThunk(
	'user/register', // это название
	async (params: { email: string, password: string, name: string }) => {
		try {
			const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/register`, {
				email: params.email,
				password: params.password,
				name: params.name
			});
			return data;
		} catch (err) {
			if (err instanceof AxiosError) {
				throw new Error(err.response?.data.message);
			}
		}
	}
);

export const userSlice = createSlice({
	// название слайса
	name: 'user',
	initialState,
	reducers: {
		// вместо addJwt сделали login.fulfilled
		// addJwt: (state, action: PayloadAction<string>) => {
		// 	state.jwt = action.payload;
		// },
		logout: (state) => {
			state.jwt = null;
		},
		clearLoginError: (state) => {
			state.loginErrorMessage = undefined;
		},
		clearRegisterError: (state) => {
			state.registerErrorMessage = undefined;
		}
	},
	// свойство через которое можно устанавливать реакцию (редьюсеры) на внешние действия
	// builder.addCase стандартный вызов. Дальше функция и состояние.
	// Короче после выполенния А нужно выполнить действие Б
	extraReducers: builder => {
		//fulfilled - в результате выполнения функции успешно все отработало
		builder.addCase(login.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loginErrorMessage = action.error.message;
		});
		builder.addCase(getProfile.fulfilled, (state, action) => {
			state.profile = action.payload;
		});
		builder.addCase(register.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(register.rejected, (state, action) => {
			state.registerErrorMessage = action.error.message;
		});


	}
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
