import {Await, useLoaderData} from 'react-router-dom';
import {Product} from '../../interfaces/product.interfacr.ts';
import {Suspense} from 'react';
import ProductItem from '../../components/ProductItem/ProductItem.tsx';

export default function Product() {

	const data = useLoaderData() as { data: Product };

	return (
		<>
			<Suspense fallback={'Загружаем данные продукта...'}>
				{/*ждем пока получим данные*/}
				<Await resolve={data.data}>
					{/*В результате получаем результирующий элемент*/}
					{({data}: { data: Product }) => (
						<ProductItem {...data}/>
						// <p>{data.name}</p>
					)}
				</Await>
			</Suspense>
		</>
	);
}