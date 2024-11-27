import React from 'react';
import styles from '../../css/css.module.css';

function BackgroundImage() {
    return (
        <div className={`container-fluid ${styles.background_image_div} mb-5`}>
            <div className={`${styles.overlay}`}>
                <h1 id="MainTitle" className={`${styles.title} col-12`}>IF A TREE FALLS</h1>
                <h3 className={`${styles.subtitle} col-12`}>WOULD YOU HEAR IT DIE?</h3>
            </div>
        </div>
    );
}

export default BackgroundImage;
