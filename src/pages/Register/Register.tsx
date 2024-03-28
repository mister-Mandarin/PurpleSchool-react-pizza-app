import TextTitle from '../../components/TextTitle/TextTitle.tsx';
import styles from '../Login/Login.module.css';
import Input from '../../components/Input/Input.tsx';
import Button from '../../components/Button/Button.tsx';
import {Link, useNavigate} from 'react-router-dom';
import {FormEvent, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store.ts';
import {register, userActions} from '../../store/User.slice.ts';

export type RegisterForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
    name: {
        value: string;
    };
}

export default function Register() {

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const {jwt, registerErrorMessage} = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	async function submit(e: FormEvent) {
		e.preventDefault();
		dispatch(userActions.clearRegisterError());
		const target = e.target as typeof e.target & RegisterForm;
		const {email, password, name} = target;
		dispatch(register({email: email.value, password: password.value, name: name.value}));
	}

	return <div className={styles.login}>
		<TextTitle>Регистрация</TextTitle>
		{registerErrorMessage && <div className={styles.error}>{registerErrorMessage}</div>}
		<form className={styles.form} onSubmit={submit}>
			<div className={styles.field}>
				<label htmlFor="email">Ваш email</label>
				<Input id="email" name='email' placeholder='Email'/>
			</div>
			<div className={styles.field}>
				<label htmlFor="password">Ваш пароль</label>
				<Input id="password" name='password' type="password" placeholder='Пароль'/>
			</div>
			<div className={styles.field}>
				<label htmlFor="name">Ваше имя</label>
				<Input id="name" name='name' placeholder='Ваше имя'/>
			</div>
			<Button size="big">Зарегистрироваться</Button>
		</form>
		<div className={styles.links}>
			<div>Есть акканут?</div>
			<Link to="/auth/login">Войти</Link>
		</div>
	</div>;
}