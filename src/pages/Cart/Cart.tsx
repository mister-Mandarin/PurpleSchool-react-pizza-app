import TextTitle from '../../components/TextTitle/TextTitle.tsx';
import CartItem from '../../components/CartItem/CartItem.tsx';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store.ts';
import {useEffect, useState} from 'react';
import {Product} from '../../interfaces/product.interfacr.ts';
import axios from 'axios';
import {PREFIX} from '../../helpers/API.ts';
import {useNavigate} from 'react-router-dom';
import {cartActions} from '../../store/Cart.slice.ts';

const DELIVERY_COST = 200;

export default function Cart() {
	const dispatch = useDispatch<AppDispatch>();
	const items = useSelector((selector: RootState) => selector.cart.items);
	const jwt = useSelector((selector: RootState) => selector.user.jwt);
	const [cartProducts, setCartProducts] = useState<Product[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		loadAllItems();
	}, [items]);

	const getItem = async (id: number) => {
		const {data} = await axios.get(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllItems = async () => {
		const result = await Promise.all(items.map(
			i => getItem(i.id)
		));
		setCartProducts(result);
	};

	const total = items.map(i => {
		const product = cartProducts.find(p => p.id === i.id);
		if (!product) {
			return 0;
		}
		return i.count * product.price;
	}).reduce((acc, item) => acc += item, 0);

	async function checkout() {
		await axios.post(`${PREFIX}/order/`, {
			products: items
		},
		{
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});
		dispatch(cartActions.cleanCart());
		navigate('/success');
	}

	return <>
		<TextTitle className={styles.headling}>Корзина</TextTitle>
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
			<div className={styles.price}>{DELIVERY_COST}&nbsp;<span>₽</span></div>
		</div>
		<hr className={styles.hr}/>
		<div className={styles.line}>
			<div className={styles.text}>Итог <span className={styles.totalCount}>({items.length})</span></div>
			<div className={styles.price}>{total + DELIVERY_COST}&nbsp;<span>₽</span></div>
		</div>
		<div className={styles.checkout}>
			<Button size="big" onClick={checkout}>оформить</Button>
		</div>
	</>;
}