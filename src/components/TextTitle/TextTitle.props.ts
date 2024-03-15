import {HTMLAttributes, ReactNode} from 'react';

export interface TextTitleProps extends HTMLAttributes<HTMLHeadingElement> {
	children: ReactNode;
}