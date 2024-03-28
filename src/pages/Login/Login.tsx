import TextTitle from '../../components/TextTitle/TextTitle.tsx';
import styles from './Login.module.css';
import Input from '../../components/Input/Input.tsx';
import Button from '../../components/Button/Button.tsx';
import {Link, useNavigate} from 'react-router-dom';
import {FormEvent, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store.ts';
import {login, userActions} from '../../store/User.slice.ts';

export type LoginForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    }
}

export default function Login() {

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const {jwt, loginErrorMessage} = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	async function submit(e: FormEvent) {
		e.preventDefault();
		dispatch(userActions.clearLoginError());
		const target = e.target as typeof e.target & LoginForm;
		const {email, password} = target;
		await SendLogin(email.value, password.value);
	}

	async function SendLogin(email: string, password: string) {

		dispatch(login({email, password}));

		// try {
		// 	const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
		// 		email, password
		// 	});
		//
		// 	//localStorage.setItem('jwt-token', data.access_token);
		// 	//dispatch(userActions.addJwt(data.access_token));
		// 	// Так как мы не можем в функции использовать <Navigate to={'/'}/>;
		// 	// то делаем это через useNavigate
		// 	navigate('/');
		// } catch (e) {
		// 	if (e instanceof AxiosError) {
		// 		console.log(e);
		// 		if (e.response) {
		// 			setErrorMessage(e.response.data.message);
		// 		} else {
		// 			// Обработка случая, когда response не определен
		// 			setErrorMessage('Произошла ошибка, но ответ не был получен.');
		// 		}
		// 	}
		// }
	}

	return <div className={styles.login}>
		<TextTitle>Вход</TextTitle>
		{loginErrorMessage && <div className={styles.error}>{loginErrorMessage}</div>}
		<form className={styles.form} onSubmit={submit}>
			<div className={styles.field}>
				<label htmlFor="email">Ваш email</label>
				<Input id="email" name='email' placeholder='Email'/>
			</div>
			<div className={styles.field}>
				<label htmlFor="password">Ваш пароль</label>
				<Input id="password" name='password' type="password" placeholder='Пароль'/>
			</div>
			<Button size="big">Вход</Button>
		</form>
		<div className={styles.links}>
			<div>Нет акканута?</div>
			<Link to="/auth/register">Зарегистрироваться</Link>
		</div>
	</div>;
}