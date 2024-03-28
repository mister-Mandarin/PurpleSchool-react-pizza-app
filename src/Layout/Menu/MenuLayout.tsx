import {NavLink, Outlet, useNavigate} from 'react-router-dom';
import styles from './MenuLayout.module.css';
import Button from '../../components/Button/Button.tsx';
import cn from 'classnames';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store.ts';
import {getProfile, userActions} from '../../store/User.slice.ts';
import {useEffect} from 'react';

export default function MenuLayout() {

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const profile = useSelector((selector: RootState) => selector.user.profile);
	const items = useSelector((selector: RootState) => selector.cart.items);

	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]);

	function logout() {
		dispatch(userActions.logout());
		navigate('/auth/login');
	}

	return (
		<div className={styles.layout}>
			<div className={styles.sidebar}>
				<div className={styles.user}>
					<img className={styles.avatar} src="/person-img.png" alt="Аватар пользователя"/>
					<div className={styles.name}>{profile?.name}</div>
					<div className={styles.email}>{profile?.email}</div>
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
							className={styles.cartCount}>{items.reduce((acc, item) => acc += item.count, 0)}</span>
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