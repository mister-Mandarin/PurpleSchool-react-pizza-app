import TextTitle from '../../components/TextTitle/TextTitle.tsx';
import CartItem from '../../components/CartItem/CartItem.tsx';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store.ts';
import {useEffect, useState} from 'react';
import {Product} from '../../interfaces/product.interfacr.ts';
import axios from 'axios';
import {PREFIX} from '../../helpers/API.ts';

export default function Cart() {
	const items = useSelector((selector: RootState) => selector.cart.items);
	const [cartProducts, setCartProducts] = useState<Product[]>();

	const getItem = async (id: number) => {
		const {data} = await axios.get(`${PREFIX}/products/${id}`);
		return data;
	};

	useEffect(() => {

	}, [items]);

	return <>
		<TextTitle className={styles['headling']}>Корзина</TextTitle>
		{items.map(i => {
			const product = cartProducts.find(p => p.id === i.id);
			if (!product) {
				return;
			}
			return <CartItem key={product.id} count={i.count} {...product} />;
		})}
		<div className={styles.line}>
			<div className={styles.text}>Итог</div>
			<div className={styles.price}>{total}&nbsp;<span>₽</span></div>
		</div>
		<hr className={styles.hr}/>
		<div className={styles.line}>
			<div className={styles.text}>Доставка</div>
			<div className={styles.price}>{DELIVERY_FEE}&nbsp;<span>₽</span></div>
		</div>
		<hr className={styles.hr}/>
		<div className={styles.line}>
			<div className={styles.text}>Итог <span className={styles['total-count']}>({items.length})</span></div>
			<div className={styles.price}>{total + DELIVERY_FEE}&nbsp;<span>₽</span></div>
		</div>
		<div className={styles['checkout']}>
			<Button size="big" onClick={checkout}>оформить</Button>
		</div>
	</>;
}