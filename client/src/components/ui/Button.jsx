import React from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const Button = ({
    children,
    variant = 'primary',
    rounded = false,
    link,
    as = 'button', 
    className,
    ...props
}) => {
    const buttonClasses = clsx(
        styles.btn,
        styles[variant],
        rounded && styles.rounded,
        className
    )

    if (as === 'link') {
        return (
            <Link to={link ?? '#'} className={`${buttonClasses} text-decoration-none`} {...props}>
                {children}
            </Link>
        )
    }

    // default render button
    return (
        <button className={buttonClasses} {...props}>
            {children}
        </button>
    )
}

export default Button
