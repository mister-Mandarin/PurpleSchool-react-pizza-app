import styles from './TextTitle.module.css';
import cn from 'classnames';
import {TextTitleProps} from './TextTitle.props.ts';

export default function TextTitle({children, className, ...props}: TextTitleProps) {
	return (
		<h1
			className={cn(className, styles.h1)}
			{...props}
		>
			{children}
		</h1>
	);
}