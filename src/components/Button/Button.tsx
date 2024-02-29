import styles from './Button.module.css';
import {ButtonProps} from './Button.props.ts';
import cn from 'classnames';

export default function Button({children, className, ...props}: ButtonProps) {
	return (
		<button
			{...props}
			className={cn(styles.button, className)}
		>
			{children}
		</button>
	);
} 