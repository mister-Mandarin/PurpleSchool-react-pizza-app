import {NavLink, Outlet, useNavigate} from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button.tsx';
import cn from 'classnames';

export default function Layout() {

	const navigate = useNavigate();

	function logout() {
		localStorage.removeItem('jwt-token');
		navigate('/auth/login');
	}

	return (
		<div className={styles.layout}>
			<div className={styles.sidebar}>
				<div className={styles.user}>
					<img className={styles.avatar} src="/person-img.png" alt="Аватар пользователя"/>
					<div className={styles.name}>Полуэктов Андрей</div>
					<div className={styles.email}>pro@ya.ru</div>
				</div>
				<div className={styles.menu}>
					<NavLink to="/" className={({isActive}) => cn(styles.link, {
						[styles.active]: isActive
					})}>
						<img src="/menu-icon.svg" alt="Иконка меню"/>
                        Меню
					</NavLink>
					<NavLink to="/cart" className={({isActive}) => cn(styles.link, {
						[styles.active]: isActive
					})}>
						<img src="/cart-icon.svg" alt="Иконка корзины"/>Корзина <span
							className={styles.cartCount}>2</span>
					</NavLink>

				</div>
				<Button className={styles.exitButton} onClick={logout}>
					<img src="/exit-icon.svg" alt="Иконка выхода"/>
                    Выход
				</Button>
			</div>
			<div className={styles.content}>
				<Outlet/>
			</div>
		</div>
	);
}