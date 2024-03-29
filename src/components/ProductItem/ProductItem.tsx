import TextTitle from '../TextTitle/TextTitle.tsx';
import {Product} from '../../interfaces/product.interfacr.ts';
import styles from './ProductItem.module.css';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store/store.ts';
import {cartActions} from '../../store/Cart.slice.ts';

export default function ProductItem(data: Product) {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	return (
		<>
			<div className={styles.header}>
				<button className={styles.arrowBack} onClick={() => navigate('/')}>
					<img src="/arrow-back.svg" alt=""/>
				</button>
				<TextTitle>{data.name}</TextTitle>
				<button className={styles.addToCart} onClick={() => dispatch(cartActions.add(data.id))}>
					<img src="/cart-button-icon.svg" alt="Добавить в корзину"/>
					<span>В корзину</span>
				</button>
			</div>
			<div className={styles.card}>
				<div className={styles.imageitem} style={{backgroundImage: `url('${data.image}')`}}></div>
				<div className={styles.details}>
					<div className={styles.line}>
						<div className={styles.text}>Цена</div>
						<div className={styles.price}>{data.price}&nbsp;<span>₽</span></div>
					</div>
					<hr className={styles.hr}/>
					<div className={styles.line}>
						<div className={styles.text}>Рейтинг</div>
						<div className={styles.rate}>{data.rating}&nbsp;<img src="/star-icon.svg" alt="Иконка звезды"/>
						</div>
					</div>
					<hr className={styles.hr}/>
					<div>
						<div className={styles.text}>Состав:</div>
						<ul className={styles.list}>
							{data.ingredients.map((i => <li key={i} className={styles.ingredient}>{i}</li>))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}