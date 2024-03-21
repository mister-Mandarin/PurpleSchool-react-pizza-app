import {ReactNode} from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store.ts';

export default function RequireAuth({children}: { children: ReactNode }) {
// useSelector делает выборку из состояния
	const jws = useSelector((s: RootState) => s.user.jwt);

	if (!jws) {
		return <Navigate to={'/auth/login'} replace/>;
	}

	return children;
}