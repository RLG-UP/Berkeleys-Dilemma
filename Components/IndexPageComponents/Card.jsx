import React from 'react';
import Image from 'next/image';

function Card({ name, image, description }) {
    return (
        <div className="col-md-4 text-center">
            <div className="text-card2 p-3">
                <h5>{name}</h5>
                <Image src={image} className="img-fluid rounded mb-3" alt={name} />
                <p>{description}</p>
            </div>
        </div>
    );
}

export default Card;
