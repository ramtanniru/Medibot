import styles from './Button.module.scss';


export const Button = (props) => {
    return (
        <button
            {...props}
            type={props.type || 'button'}
            className={`${styles.button} ${
                props.variant === 'secondary' && styles.secondary
            } ${props?.customClass ? props?.customClass : ''}`}>
            {props.children}
        </button>
    );
};
