import React from 'react';
import Image from 'next/image';
import styles from '../../css/css.module.css';

function Card({ name, image, description }) {
    return (
        <div className="col-md-4 text-center">
            <div className={`${styles.text_card2} p-3`}>
                <h5>{name}</h5>
                <Image src={image} className="img-fluid rounded mb-3" width={1920} height={1080} alt={name} />
                <p>{description}</p>
            </div>
        </div>
    );
}

export default Card;
