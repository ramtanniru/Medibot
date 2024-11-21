import { ReactElement, useEffect } from 'react';
import styles from './Loader.module.scss';


export const Loader = ({ loading, text }) => {
    useEffect(() => {
        if (loading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [loading]);

    return (
        <>
            {loading && (
                <div className={styles.loader}>
                    {text}
                   
                </div>
            )}
        </>
    );
};
