import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import loadState from './storage.ts';

export interface CartItem {
    id: number;
    count: number;
}

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
	items: loadState('cart') ?? []
};

export const cartSlice = createSlice({
	// название слайса
	name: 'cart',
	initialState,
	reducers: {
		cleanCart: (state) => {
			state.items = [];
		},
		add: (state, action: PayloadAction<number>) => {
			const existing = state.items.find(item => item.id === action.payload);
			if (!existing) {
				state.items.push({id: action.payload, count: 1});
				return;
			} else {
				state.items.map(item => {
					if (item.id === action.payload) {
						item.count += 1;
					}
					return item;
				});
				return;
			}
		},
		remove: (state, action) => {
			const existing = state.items.find(item => item.id === action.payload);
			if (!existing) {
				return;
			}
			if (existing.count === 1) {
				state.items = state.items.filter(item => item.id !== action.payload);
				return;
			} else {
				state.items.map(item => {
					if (item.id === action.payload) {
						item.count -= 1;
					}
					return item;
				});
			}
		},
		delete: (state, action) => {
			state.items = state.items.filter(item => item.id !== action.payload);
		}
	}
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
