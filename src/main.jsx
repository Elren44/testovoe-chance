import React from 'react'
import ReactDOM from 'react-dom/client'
import Products from './screens/Products/Products.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store/index.js";
import {Favorites} from "./screens/Favorites/Favorites.jsx";
import Cart from "./screens/Cart/Cart.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Products />,
    },
    {
        path: "/favorites",
        element: <Favorites />,
    },
    {
        path: "/cart",
        element: <Cart />,
    },
],);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>,
)
