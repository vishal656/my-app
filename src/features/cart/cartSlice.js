import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { reduceProductStock } from '../../utils/stock';

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};
const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cart')) || defaultState;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    // -----------------------
    // ADD ITEM (STOCK SAFE)
    // -----------------------
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.cartItems.find(
        (i) => i.cartID === product.cartID
      );
    
      if (item) {
        const newAmount = item.amount + product.amount;
    
        if (newAmount > product.stock) {
          toast.error('Stock limit reached');
          return;
        }
    
        item.amount = newAmount;
    
        //deduct ONLY the added amount
        reduceProductStock(product.productID, product.amount);
    
        toast.success('Cart updated');
      } else {
        if (product.stock === 0) {
          toast.error('Out of stock');
          return;
        }
    
        const amountToAdd = Math.min(product.amount, product.stock);
    
        state.cartItems.push({
          ...product,
          amount: amountToAdd,
        });
    
        // deduct initial add amount
        reduceProductStock(product.productID, amountToAdd);
    
        toast.success('Item added to cart');
      }
    
      cartSlice.caseReducers.calculateTotals(state);
    },

    // -----------------------
    // REMOVE ITEM
    // -----------------------
    removeItem: (state, action) => {
      const { cartID } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.cartID !== cartID
      );
      cartSlice.caseReducers.calculateTotals(state);
      toast.error('Item removed');
    },

    // -----------------------
    // EDIT QUANTITY (STOCK SAFE)
    // -----------------------
    editItem: (state, action) => {
      const { cartID, amount } = action.payload;
      const item = state.cartItems.find(
        (i) => i.cartID === cartID
      );

      if (!item) return;

      if (amount > item.stock) {
        item.amount = item.stock;
        toast.error('Only limited stock available');
      } else {
        item.amount = amount;
        toast.success('Cart updated');
      }

      cartSlice.caseReducers.calculateTotals(state);
    },

    // -----------------------
    // CLEAR CART
    // -----------------------
    clearCart: () => {
      localStorage.setItem('cart', JSON.stringify(defaultState));
      return defaultState;
    },

    // -----------------------
    // CALCULATE TOTALS
    // -----------------------
    calculateTotals: (state) => {
      let items = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        items += item.amount;
        total += item.amount * item.price;
      });

      state.numItemsInCart = items;
      state.cartTotal = total;
      state.tax = total * 0.1;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;

      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const {
  addItem,
  removeItem,
  editItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
