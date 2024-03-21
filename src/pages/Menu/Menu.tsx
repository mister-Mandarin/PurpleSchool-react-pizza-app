import TextTitle from '../../components/TextTitle/TextTitle.tsx';
import Search from '../../components/Search/Search.tsx';
import styles from './Menu.module.css';
import {PREFIX} from '../../helpers/API.ts';
import {Product} from '../../interfaces/product.interfacr.ts';
import {useEffect, useState} from 'react';
import axios, {AxiosError} from 'axios';
import {MenuList} from './MenuList/MenuList.tsx';

export default function Menu() {
	const [data, setData] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

	const getMenu = async () => {

		// try {
		// 	const response = await fetch(`${PREFIX}/products`);
		// 	if (!response.ok) {
		// 		return;
		// 	}
		// 	const data = await response.json() as Product[];
		// 	setData(data);
		// } catch (e) {
		// 	console.error(e);
		// 	return;
		// }

		try {
			setIsLoading(true);
			const {data} = await axios.get<Product[]>(`${PREFIX}/products`);
			setData(data);
			setIsLoading(false);
			setError(undefined);
		} catch (e) {
			console.error(e);
			if (e instanceof AxiosError) {
				setError(e.message);
			}
			setIsLoading(false);
			return;
		}

	};

	useEffect(() => {
		getMenu();
	},
	[]);

	return (
		<div>
			<div className={styles.head}>
				<TextTitle>Это меню</TextTitle>
				<Search placeholder="Введите блюдо или состав"/>
			</div>
			<div>
				{error && <>{error}</>}
				{!isLoading && <MenuList products={data}/>}
				{isLoading && <p>Продукты загружаются...</p>}
			</div>
		</div>
	);
}
