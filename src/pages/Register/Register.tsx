import TextTitle from '../../components/TextTitle/TextTitle.tsx';
import styles from '../Login/Login.module.css';
import Input from '../../components/Input/Input.tsx';
import Button from '../../components/Button/Button.tsx';
import {Link} from 'react-router-dom';
import {FormEvent} from 'react';

export default function Register() {

	function submit(e: FormEvent) {
		e.preventDefault();
		console.log(e);
	}

	return <div className={styles.login}>
		<TextTitle>Вход</TextTitle>
		{/*{loginErrorMessage && <div className={styles.error}>{loginErrorMessage}</div>}*/}
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