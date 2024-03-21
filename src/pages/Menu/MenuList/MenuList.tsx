import {MenuListProps} from './MenuList.props';
import styles from './MenuList.module.css';
import CardProduct from '../../../components/CardProduct/CardProduct.tsx';

export function MenuList({products}: MenuListProps) {
	return <div className={styles.wrapper}>
		{products.map(p => (
			<CardProduct
				key={p.id}
				id={p.id}
				name={p.name}
				description={p.ingredients.join(', ')}
				rating={p.rating}
				price={p.price}
				image={p.image}
			/>
		))}
	</div>;
} 