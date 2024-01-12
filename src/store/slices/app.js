import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {FAILED, IDLE, LOADING} from "../../services/constants.js";

export const fetchProducts = createAsyncThunk(
    'getProducts',
    async (thunkAPI) => {
        const response = await axios.get('/products')
        return response.data
    }
)

const initialState = {
    products: {},
    favorites: [],
    cart: [],
    loadingStatus: IDLE,
    error: ""
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        addToCart: (state, action) => {

            const cartItem = action.payload
            let founded = false;
            let newState = [...state.cart];
            let max = false
             state.cart.map(el => {
                if (el.name === cartItem.name) {
                    founded = true
                }
                if (el.name === cartItem.name && el.count === action.payload.quantity) {
                    max = true
                    el.error = "Товар закончился"
                }
            })

            if (!max) {
                if (founded) {
                    newState.map(el => {
                        if (el.name === cartItem.name) {
                            el.count += 1

                        }
                    })
                } else {
                    newState = [
                        ...newState,
                        {count: 1, ...cartItem}
                    ]
                }

                    state.cart = [...newState];

            }


        },

        addToFavorites: (state, action) => {
            state.favorites = [
                ...state.favorites,
                action.payload
            ]
        },
        removeFromCart: (state, action) => {
            let itemIdx = null;
            const cartItem = action.payload

           const newState = state.cart.filter(((el)=> {
                   return !(el.name === cartItem.name && el.count === 1);
           }))

            state.cart = [...newState]
            state.cart.map((el) => {
                if (el.name === cartItem.name && el.count > 1) {
                    el.count = el.count - 1
                }
            })
            // state.cart = state.cart.filter(el => el.name !== action.payload)
        },
        removeFromFavorites: (state, action) => {
            state.favorites = [...state.favorites.filter(el => el.name !== action.payload.name)]
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loadingStatus = LOADING;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                // Добавляем товары
                state.products = action.payload
                state.loadingStatus = IDLE;
                state.error = null;
            })
            // Вызывается в случае ошибки
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loadingStatus = FAILED;
                state.error = action.error;
            });

    },
})

// Action creators are generated for each case reducer function
export const {addToCart, addToFavorites,removeFromCart, removeFromFavorites} = appSlice.actions

export default appSlice.reducer
