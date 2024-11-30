import React, { useState, useEffect } from "react";
import styles from "../css/e1.module.css";
import Image from 'next/image';

import Terms from "../General_Components/Terms.jsx";
import { useRouter } from 'next/router';
import HiddenBerkeley from "../General_Components/NavBar.jsx";
import Link from 'next/link';
const EnvironmentPage = () => {
    const CarouselOne = [{
        src: 'https://hips.hearstapps.com/hmg-prod/images/mata-atlantica-atlantic-forest-in-brazil-royalty-free-image-1668724621.jpg',
        alt: 'Healthy Amazon',
        overlay: 'Diverse and balanced ecosystems with rich biodiversity. Sustainable support for indigenous communities and wildlife.'
    },
    {
        src: 'https://palotoaamazontravel.com/wp-content/uploads/2024/09/amazon-3.webp',
        alt: 'Thriving Amazon',
        overlay: 'Preservation of native flora and fauna, with sustainable management practices. Positive interaction between communities and the environment.'
    },
    {
        src: 'https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2021/11/Untitled-design-88.jpg',
        alt: 'Threatened Amazon',
        overlay: 'Increase in deforestation in specific areas.Pressure on natural resources from activities like agriculture and livestock.'
    },
    {
        src: 'https://scx2.b-cdn.net/gfx/news/2021/a-deforested-area-of-r.jpg',
        alt: 'Damaged Amazon',
        overlay: 'Fragmentation of habitats due to road construction and settlements. Loss of native species and alterations in ecosystems.'
    },
    {
        src: 'https://static.dw.com/image/54488003_605.jpg',
        alt: 'Severely Damaged Amazon',
        overlay: 'Increased pollution from pesticides and industrial waste. Displacement of indigenous communities due to resource exploitation.'
    },
    {
        src: 'https://image.cnbcfm.com/api/v1/image/106975234-1636936362963-gettyimages-1228062683-AFP_1WJ4KX.jpeg?v=1636936106',
        alt: 'Degraded Amazon',
        overlay: 'Significant areas of deforested land with eroded soils. Disruption of the water cycle, affecting rivers and local climate.'
    },
    {
        src: 'https://i.natgeofe.com/n/ab13d39b-7747-4b7e-abd0-362aa4ff6267/283.jpg',
        alt: 'Critically Damaged Amazon',
        overlay: 'Significant loss of biodiversity, with many species endangered. Increase in wildfires, both intentional and accidental.'
    },
    {
        src: 'https://www.butlernature.com/wp-content/uploads/2021/06/GP0STUPV7_AmazonFiresAug20_PressMedia-1200x800.jpeg',
        alt: 'Devastated Amazon',
        overlay: 'Collapsed ecosystems with little or no chance of natural recovery. Unregulated urban development affecting the natural environment.'
    },
    {
        src: 'https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/MMD6AMVZU5TD2EGEBBMHT6Y2LA.JPG',
        alt: 'Exhausted Amazon',
        overlay: 'Unfertile soils and loss of nutrients, making regeneration impossible. Contaminated and scarce water resources.'
    },
    {
        src: 'https://www.greenpeace.org/static/planet4-international-stateless/2022/08/b9d170b7-gp1su5ae_-1024x684.jpg',
        alt: 'Destroyed Amazon',
        overlay: 'Total loss of most biodiversity. Irreversibly altered and degraded ecosystems, with massive environmental impact.'
    }];
    
    const CarouselTwo = [{
        src: 'https://www.travelandleisure.com/thmb/qnFoUlxGP3j-1C7uUm04Ut0wqjU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ice-monolith-antarctica-TRVLTOANT0518-cd3a9ff6d76f4e989d9b896a0bb15089.jpg',
        alt: 'Pristine Antarctica',
        overlay: 'Untouched landscapes, abundant marine life, and stable ice shelves supporting diverse ecosystems.'
    },
    {
        src: 'https://storage.googleapis.com/travel-web-app-1.appspot.com/flamelink/media/Antartic%20penguins.jpg?GoogleAccessId=firebase-adminsdk-g2s60%40travel-web-app-1.iam.gserviceaccount.com&Expires=16725225600&Signature=GWyZ2Q2dbCdI9jQ5molzj4QSjUKafPDhG8qTazv4A47eTqJhsKbonPjXALgRG%2FT4THnggDGbvqlQO6CWWK8IsHBNirEzxNKmiCr7x3e4WAyYBa1O2HiWQhjflavdeMz%2F%2Blbw0s8D%2Fl7K8U29S5Ux4TkyIPhHIuAL739gdj4u4jyei%2BNDuhhdjk2tO1AbLByOmnTl7TWlHeEZkeEUO7oTuPuN6m9ZgcT4G9hlOXAHQsxEYyMYjtZilBl7heEaJazK%2BL42ukjPcwDn16%2F4L0658bw6E0sW8VgPNLNFxoPAA39QBUjbmRdv7fnhG6%2FRVYLoP5YzKR4U9cI9P%2FtUXneMBg%3D%3D',
        alt: 'Balanced Ecosystem',
        overlay: 'Balanced ecosystems with thriving marine and bird species, minimal human impact.'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZQYnpopmS1k-yqttBjpmZc6_We2N84DqfhA&s',
        alt: 'Melting Ice Shelves',
        overlay: 'Increasing melt rates of ice shelves, impacting habitats for seals, penguins, and other wildlife.'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3FxOXhym_AxNXsHKLvB_N4ZlV9qD6h4jOg&s',
        alt: 'Stressed Ecosystem',
        overlay: 'Icebergs are melting at accelerated rates. Marine species face habitat reduction and food scarcity.'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtUkK6iwe-ejvfpld_DW5wEcv-OgiDMmXutg&s',
        alt: 'Threatened Biodiversity',
        overlay: 'Increased ocean temperatures threaten biodiversity and disrupt native species migration patterns.'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9eUh4vqlyB2A99oWG_waSYugWtJOWmkqybw&s',
        alt: 'Fragile Ecosystem',
        overlay: 'Vulnerable ice shelves and glaciers. Impacts on species dependent on stable, icy habitats.'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWDalY4RujZi8yvlYyp_Lul8JzVET1lnE18w&s',
        alt: 'Declining Penguin Populations',
        overlay: 'Penguin populations dwindle due to habitat loss, with dwindling food resources and harsh conditions.'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb330JVCDwcal7bjDxuGDC_lFKp9tncXkZog&s',
        alt: 'Severely Impacted Ice Sheets',
        overlay: 'Rapid ice sheet melting leads to rising sea levels, impacting coastlines globally.'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl-s4oaL8C5Oq29r3I09vMgKu6XXielNvmRg&s',
        alt: 'Endangered Ecosystem',
        overlay: 'Lack of stable ice severely disrupts the ecosystem, affecting the Antarctic food chain and breeding patterns.'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJUR2j4y75T8mAAtyIwENwQru2mW2nkz037A&s',
        alt: 'Collapsed Ice Ecosystem',
        overlay: 'Complete ecosystem collapse with minimal wildlife presence. The region has lost most of its former resilience.'
    }];
    
    const CarouselThree = [{
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTjyZlWwG1Pbsg2Y5Qiek711INFrwa1_wTzQ&s',
        alt: 'Pristine Tasmania',
        overlay: 'Untouched landscapes with unique flora and fauna, home to a thriving biodiversity and rare species like the Tasmanian devil.'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO-izIhKTsurOsUSu8FuMIRdYUwaS32heKJw&s',
        alt: 'Balanced Tasmanian Ecosystem',
        overlay: 'Stable ecosystems with lush forests, clean rivers, and abundant wildlife, minimally impacted by human activity.'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUfAvAGdNW7eL_SEiZ_P7dFIiGZarEdbNPYA&s',
        alt: 'Deforestation Impact',
        overlay: 'Rising deforestation rates impacting natural habitats. Increased land clearing threatens Tasmania’s biodiversity.'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYiq1DBkbTlWOX6_btoLcVKVsKZcwjxKgq1w&s',
        alt: 'Stressed Ecosystem',
        overlay: 'Invasive species and habitat destruction put pressure on native wildlife, creating scarcity of resources.'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7FmZYZp_m9_vnLMUDDRQ6xVb3wci-9MqnyA&s',
        alt: 'Threatened Biodiversity',
        overlay: 'Warming ocean temperatures disrupt marine life along the coasts, affecting fish populations and kelp forests.'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyE1dG9ZASw-O2wY0JaSq4gIetFaN4UfaY1w&s',
        alt: 'Fragile Forest Ecosystem',
        overlay: 'Logging and mining encroach upon protected forests, altering habitats and threatening endangered species.'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO96S0ptPfLcauVyso0PjhxD8K7xycdV8MZw&s',
        alt: 'Declining Tasmanian Devil Populations',
        overlay: 'Disease and habitat loss cause a decline in Tasmanian devil populations, endangering this iconic species.'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV1X5ojiJKQwVIApdlt1nwUhpegSzC_O9fDQ&s',
        alt: 'Severely Impacted Coastlines',
        overlay: 'Coastal erosion and pollution threaten marine ecosystems, affecting both tourism and local fishing industries.'
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Babel_Island_Aerial.jpg',
        alt: 'Endangered Forests',
        overlay: 'Logging practices lead to fragmented forests, with many plant and animal species struggling to survive.'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSFkWjtWj18V8z_JO-bD-2fPy753S1VSSE1Q&s',
        alt: 'Critically Damaged Ecosystem',
        overlay: 'Ecosystem collapse in key areas, with irreversible loss of biodiversity and long-term environmental impacts.'
    }];
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
