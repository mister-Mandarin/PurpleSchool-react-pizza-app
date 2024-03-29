import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, defer, RouterProvider} from 'react-router-dom';
import Cart from './pages/Cart/Cart.tsx';
import Error from './pages/Error/Error.tsx';
import Product from './pages/Product/Product.tsx';
import axios from 'axios';
import {PREFIX} from './helpers/API.ts';
import AuthLayout from './Layout/Auth/AuthLayout.tsx';
import Login from './pages/Login/Login.tsx';
import Register from './pages/Register/Register.tsx';
import RequireAuth from './helpers/RequireAuth.tsx';
import {Provider} from 'react-redux';
import Menu from './pages/Menu/Menu.tsx';
import store from './store/store.ts';
import {Success} from './pages/Success/Success.tsx';

// разбиваем бандл на несколкьо файлов.
// Тем самым выносим меню в отдельный js файл. Нужный компонент оборачиваем в Suspense
const MenuLayout = lazy(() =>
	import('./Layout/Menu/MenuLayout.tsx')
);

const router = createBrowserRouter([
	{
		path: '/',
		// обернули все страницы в компоннео "авторизации". Если нет токена - то он дальше не пропустит
		element: <RequireAuth><MenuLayout/></RequireAuth>,
		children: [
			{
				path: '/',
				// слова в fallback можно видеть при быстром обновлении
				element: <Suspense fallback={<>Загрука страницы</>}><Menu/></Suspense>
			},
			{
				path: '/cart',
				element: <Cart/>
			},
			{
				path: '/success',
				element: <Success/>
			},
			{
				// после двоеточия может быть любое название
				// это значение можно достать с помощью useParams
				path: '/product/:id',
				element: <Product/>,
				// условия если при загрузке страницы произошла ошибка
				errorElement: <>Ошибка</>,
				loader: async ({params}) => {
					return defer({
						data: new Promise<void>((resolve, reject) => {
							setTimeout(() => {
								axios.get(`${PREFIX}/products/${params.id}`)
									.then(data => {
										resolve(data);
									})
								// обрабатываем ошибку. Если ошибка то выводим errorElement
									.catch(error => reject(error));
							}, 2000);
						})
					});

					// return defer({
					// 	data: axios.get(`${PREFIX}/products/${params.id}`).then(data => data)
					// });

					// await new Promise<void>((resolve) => {
					// 	setTimeout(() => {
					// 		resolve();
					// 	}, 2000);
					// });
					//
					// const {data} = await axios.get(`${PREFIX}/products/${params.id}`);
					// return data;
				}
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout/>,
		children: [
			{
				path: 'login',
				element: <Login/>
			},
			{
				path: 'register',
				element: <Register/>
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
		<Provider store={store}>
			<RouterProvider router={router}/>
		</Provider>
	</React.StrictMode>
);
