import React, {useState, useEffect} from "react";
import styles from "../css/e1.module.css"; 
import {CarouselOne, CarouselTwo, CarouselThree} from './EnvironmentPageComponents/CarrouselConst.js';
import Image from 'next/image';

import Terms from "../Components/RegularComponents/Terms.jsx";
import {useRouter} from 'next/router';
import HiddenBerkeley from "../General_Components/NavBar.jsx";

const EnvironmentPage = () => {
    const router = useRouter(); // Initialize useRouter hook
    const [nCarrousel, setNCarrousel] = useState(3); // Default to CarouselThree

    useEffect(() => {
        if (router.query.envId) {
            // Parse envId as integer and set it to nCarrousel
            setNCarrousel(parseInt(router.query.envId, 10));
        }
    }, [router.query.envId]); // This will run every time the query parameter changes

    let carrousel = {};

    switch(nCarrousel){
        case 1:
            carrousel = CarouselOne;
            break
        case 2:
            carrousel = CarouselTwo;
            break
        default:
            carrousel = CarouselThree;
            break
    }

    return (
        <div className="fondo text-white">
            <HiddenBerkeley />

            <div className={styles.envBod} id="idEnvBod">
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
                        <div className={`${styles.top_slide} col-8 offset-2`}>
                            <div className={`${styles.slider_container} w-100`}>
                                <label htmlFor="customRange" className={styles.form_label}>
                                    <h3>Timeline</h3>
                                </label>
                                <form action="" className={styles.form}>
                                    <input
                                        type="range"
                                        className={`${styles.slide_bar} form-range ${styles.range_slider}`}
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
                                    className={`${styles.carousel_item} ${index === 0 ? styles.active : ''} col-12`}
                                >
                                    <Image
                                        src={photo.src} width={7920} height={4455}
                                        id="carousel-image"
                                        className="d-block w-100 h-100"
                                        alt={photo.alt}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Thumbnails Section */}
                    <div className="thumb_nails col-12 contain-fluid">
                        <div className="row thumb_nl_cnt text-center mt-4">
                            {carrousel.map((photo, index) => (
                                <div
                                    key={index}
                                    className={`${styles.photo_1} ${styles.thumb_nl} contain-fluid col-lg-3 col-6`}
                                >
                                    <Image
                                        src={photo.src} width={500} height={500} 
                                        className="img_fluid w-100 h-100"
                                        alt={photo.alt}
                                    />
                                    <div className={styles.overlay_1}>{photo.overlay}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <hr />
                <Terms />
            </div>
        </div>
    );
};

export default EnvironmentPage;