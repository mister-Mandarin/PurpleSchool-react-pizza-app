import {Link} from 'react-router-dom';
import styles from './CardProduct.module.css';
import {CardProductProps} from './CardProduct.props.ts';

function CardProduct(props: CardProductProps) {

	return (
		<Link to={`/product/${props.id}`} className={styles.link}>
			<div className={styles.card}>
				<div
					className={styles.head}
					style={{backgroundImage: `url('${props.image}')`}}>
					<div className={styles.price}>
						{props.price}&nbsp;
						<span className={styles.currency}>₽</span>
					</div>
					<button className={styles.addToCart}>
						<img src="/cart-button-icon.svg" alt="Добавить в корзину"/>
					</button>
					<div className={styles.rating}>
						{props.rating}&nbsp;
						<img src="/star-icon.svg" alt="Иконка звезды"/>
					</div>
				</div>
				<div className={styles.footer}>
					<div className={styles.title}>{props.title}</div>
					<div className={styles.description}>{props.description}</div>
				</div>
			</div>
		</Link>
	);
}

export default CardProduct;