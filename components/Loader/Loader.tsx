import { ReactElement, useEffect } from 'react';
import styles from './Loader.module.scss';
 import Image from 'next/image';

type LoaderProps = {
    loading: boolean;
    text?: string | ReactElement;
};

export const Loader = ({ loading, text }: LoaderProps) => {
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
