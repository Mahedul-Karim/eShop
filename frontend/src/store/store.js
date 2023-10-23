import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import sellerSlice from './sellerSlice';
import productSlice from './productSlice';
import eventSlice from './eventSlice';
import cartSlice from './cartSlice';
import wishlistSlice from './wishlistSlice';
import orderSlice from './orderSlice';

const Store=configureStore({
    reducer:{
        auth:userSlice.reducer,
        seller:sellerSlice.reducer,
        product:productSlice.reducer,
        event:eventSlice.reducer,
        cart:cartSlice.reducer,
        wishlist:wishlistSlice.reducer,
        order:orderSlice.reducer
    }
});

export default Store;