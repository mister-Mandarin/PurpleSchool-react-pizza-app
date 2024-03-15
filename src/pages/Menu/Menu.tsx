import TextTitle from '../../components/TextTitle/TextTitle.tsx';
import Search from '../../components/Search/Search.tsx';
import styles from './Menu.module.css';
import CardProduct from '../../components/CardProduct/CardProduct.tsx';

export default function Menu() {
	return (
		<div>
			<div className={styles.head}>
				<TextTitle>Это меню</TextTitle>
				<Search placeholder="Введите блюдо или состав"/>
			</div>
			<div>
				<CardProduct
					id={1}
					title="Наслаждение"
					description="Салями, руккола, помидоры, оливки"
					rating={4.5}
					price={300}
					image="/product-demo.png"
				/>
			</div>
		</div>
	);
}