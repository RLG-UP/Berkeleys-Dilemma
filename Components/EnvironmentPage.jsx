import React from "react";
import "../public/css/e1.css"; 
import "../public/css/global.css";
import {CarouselOne, CarouselTwo, CarouselThree} from './EnvironmentPageComponents/CarrouselConst.js';
import Image from 'next/image';

import Terms from './Terms.jsx';

const EnvironmentPage = ({ nCarrousel }) => {
    switch(nCarrousel){
        case 1:
            var carrousel = CarouselOne;
            break
        case 2:
            var carrousel = CarouselTwo;
            break
        default:
            var carrousel = CarouselThree;
            break
    }

    return (
        <div className="fondo text-white">
            <div className="envBod" id="idEnvBod">
                {/* Navigation Component */}
                {/* Replace with your actual navigation component */}
                <nav>
                    {/* Navigation content */}
                </nav>

                {/* Titles Section */}
                <div className="titles"></div>

                <div className="container">
                    {/* Carousel Section */}
                    <div
                        id="photoCarousel"
                        className="container-fluid carousel slide"
                        data-bs-ride="carousel"
                    >
                        <div className="top-slide col-8 offset-2">
                            <div className="slider-container w-100">
                                <label htmlFor="customRange" className="form-label">
                                    <h3>Timeline</h3>
                                </label>
                                <form action="">
                                    <input
                                        type="range"
                                        className="slide-bar form-range range-slider"
                                        min="0"
                                        max="100"
                                        defaultValue="0"
                                        id="customRange"
                                        name="customRange"
                                    />
                                </form>
                            </div>
                        </div>

                        <div className="carousel-inner">
                            {carrousel.map((photo, index) => (
                                <div
                                    key={index}
                                    className={`carousel-item ${
                                        index === 0 ? "active" : ""
                                    } col-12`}
                                >
                                    <Image
                                        src={photo.src} width={10} height={10}
                                        id="carousel-image"
                                        className="d-block w-100 h-100"
                                        alt={photo.alt}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Thumbnails Section */}
                    <div className="thumb-nails col-12 contain-fluid">
                        <div className="row thumb_nl_cnt text-center mt-4">
                            {carrousel.map((photo, index) => (
                                <div
                                    key={index}
                                    className="photo-1 thumb_nl contain-fluid col-lg-3 col-6"
                                >
                                    <Image
                                        src={photo.src} width={10} height={10} 
                                        className="img-fluid"
                                        alt={photo.alt}
                                    />
                                    <div className="overlay-1">{photo.overlay}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Terms />
            </div>
        </div>
    );
};

export default EnvironmentPage;
