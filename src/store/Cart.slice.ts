import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface CartItem {
    id: number;
    count: number;
}

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
	items: []
};

export const cartSlice = createSlice({
	// название слайса
	name: 'cart',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<number>) => {
			const existing = state.items.find(item => item.id === action.payload);
			if (!existing) {
				state.items.push({id: action.payload, count: 1});
			} else {
				state.items.map(item => {
					if (item.id === action.payload) {
						item.count += 1;
					}
				});
			}
		}
	}
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
