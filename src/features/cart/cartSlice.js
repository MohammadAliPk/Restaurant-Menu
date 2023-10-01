import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedItems: [],
    itemsCounter: 0,
    total: 0,
    checkout: false
}



const sumItems = items => {
    const itemsCounter = items.reduce((total, product) => total + product.quantity, 0);
    let total = items.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
    return { itemsCounter, total }
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        increament: (state, action) => {
            const indexI = state.selectedItems.findIndex(item => item.id === action.payload.id);
            state.selectedItems[indexI].quantity++;
            const { itemsCounter, total } = sumItems(state.selectedItems);
            state.itemsCounter = itemsCounter;
            state.total = total;
        },
        decreament: (state, action) => {
            const indexD = state.selectedItems.findIndex(item => item.id === action.payload.id);
            state.selectedItems[indexD].quantity--;
            const { itemsCounter, total } = sumItems(state.selectedItems);
            state.itemsCounter = itemsCounter;
            state.total = total;
        },
        addItem: (state, action) => {
            if (!state.selectedItems.find(item => item.id === action.payload.id)) {
                state.selectedItems.push({
                    ...action.payload,
                    quantity: 1
                });
            }
            const { itemsCounter, total } = sumItems(state.selectedItems);
            state.selectedItems = [...state.selectedItems];
            state.itemsCounter = itemsCounter;
            state.total = total;
            state.checkout = false;
        },
        removeItem: (state, action) => {
            const newSelectedItems = state.selectedItems.filter(item => item.id !== action.payload.id);
            const { itemsCounter, total } = sumItems(newSelectedItems);
            state.selectedItems = newSelectedItems;
            state.itemsCounter = itemsCounter;
            state.total = total;
        },
        clear: () => {
            return initialState;
        }
    }
});


export const { increament, decreament, addItem, removeItem, clear } = cartSlice.actions;
export default cartSlice.reducer;
