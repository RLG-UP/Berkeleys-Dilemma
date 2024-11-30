import React, { useState, useEffect } from "react";
import styles from "../css/e1.module.css";
import { CarouselOne, CarouselTwo, CarouselThree } from './EnvironmentPageComponents/CarrouselConst.js';
import Image from 'next/image';

import Terms from "../General_Components/Terms.jsx";
import { useRouter } from 'next/router';
import HiddenBerkeley from "../General_Components/NavBar.jsx";
import Link from 'next/link';
const EnvironmentPage = () => {
    const router = useRouter(); // Initialize useRouter hook
    const [nCarrousel, setNCarrousel] = useState(3); // Default to CarouselThree
    const [sliderValue, setSliderValue] = useState(0); // Slider state
    const [backgroundColor, setBackgroundColor] = useState("rgb(57, 62, 65)"); // Initial background color
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Current carousel image index

    useEffect(() => {
        if (router.query.envId) {
            // Parse envId as integer and set it to nCarrousel
            setNCarrousel(parseInt(router.query.envId, 10));
            setCurrentImageIndex(0);
            setSliderValue(0);
        }
    }, [router.query.envId]); // This will run every time the query parameter changes

    let carrousel = [];

    switch (nCarrousel) {
        case 1:
            carrousel = CarouselOne;
            break;
        case 2:
            carrousel = CarouselTwo;
            break;
        default:
            carrousel = CarouselThree;
            break;
    }

    const handleSliderChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setSliderValue(value);

        // Calculate RGB background color based on slider value
        const R = (57 + value) % 256;
        const G = (62 + value) % 62;
        const B = (65 + value) % 18;
        setBackgroundColor(`rgb(${R}, ${G}, ${B})`);

        // Update the current image index based on the slider value
        const index = Math.max(0, Math.floor(value / 10) - 1);
        setCurrentImageIndex(index);
    };


    return (
        <div className="fondo text-white" style={{ backgroundColor }}>
            <HiddenBerkeley />

            <div className={styles.envBod} id="idEnvBod">
                {/* Navigation Component */}
                <nav>
                    {/* Navigation content */}
                </nav>

                {/* Titles Section */}
                <div className="titles"></div>

                <div className="container">
                    {/* Carousel Section */}
                    <div id="photoCarousel" className="carousel slide" data-bs-ride="carousel">

                        {/* Timeline Slider */}
                        <div className={`${styles.top_slide} col-8 offset-2`}>
                            <div className={`${styles.slider_container} w-100`}>
                                <label htmlFor="customRange" className={styles.form_label}>
                                    <h3>Timeline</h3>
                                </label>
                                <div className="row justify-content-center">
                                    <div className="col-12 d-flex flex-wrap justify-content-between">
                                        <div className="col-12 col-md-4 p-2">
                                        <Link href="/Environment?envId=1" className="btn w-100 start-btn2">
                                            AMAZON RAINFOREST
                                        </Link>
                                        </div>
                                        <div className="col-12 col-md-4 p-2">
                                        <Link href="/Environment?envId=2" className="btn  w-100 start-btn2">
                                            ANTARCTIC
                                        </Link>
                                        </div>
                                        <div className="col-12 col-md-4 p-2">
                                        <Link href="/Environment?envId=3" className="btn w-100 start-btn2">
                                            TASMANIA
                                        </Link>
                                        </div>
                                    </div>
                                    </div>

                                <form>
                                    <input
                                        type="range"
                                        className={`${styles.slide_bar} form-range ${styles.range_slider}`}
                                        min="0"
                                        max="100"
                                        value={sliderValue}
                                        id="customRange"
                                        name="customRange"
                                        onChange={handleSliderChange}
                                    />
                                </form>
                            </div>
                        </div>

                        {/* Carousel Items */}
                        <div className="carousel-inner">
                            {carrousel.map((photo, index) => (
                                <div
                                    key={index}
                                    className={`carousel-item ${index === currentImageIndex ? "active" : ""} col-12`}
                                >
                                    <Image
                                        src={photo.src}
                                        width={7920}
                                        height={4455}
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
                                        src={photo.src}
                                        width={500}
                                        height={500}
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
