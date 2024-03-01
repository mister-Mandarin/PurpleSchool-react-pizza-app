import styles from './Button.module.css';
import {ButtonProps} from './Button.props.ts';
import cn from 'classnames';

export default function Button({children, className, size = 'small', ...props}: ButtonProps) {
	return (
		<button
			{...props}
			className={cn(styles.button, styles.accent, className, {
				[styles.small]: size === 'small',
				[styles.big]: size === 'big'
			})}
		>
			{children}
		</button>
	);
} 