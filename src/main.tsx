import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Menu from './pages/Menu/Menu.tsx';
import Cart from './pages/Cart/Cart.tsx';
import Error from './pages/Error/Error.tsx';
import Layout from './Layout/Menu/Layout.tsx';
import Product from './pages/Product/Product.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout/>,
		children: [
			{
				path: '/',
				element: <Menu/>
			},
			{
				path: '/cart',
				element: <Cart/>
			},
			{
				// после двоеточия может быть любое название
				// это значение можно достать с помощью useParams
				path: '/product/:id',
				element: <Product/>
			}
		]
	},
	{
		path: '*',
		element: <Error/>
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router}/>
	</React.StrictMode>
);
