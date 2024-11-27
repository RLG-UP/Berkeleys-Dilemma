import React from 'react';
//import Navbar from './Navbar';
import BackgroundImage from './IndexPageComponents/BackgroundImage';
import Section from './IndexPageComponents/Section';
import Card from './IndexPageComponents/Card';
import VisionMission from './IndexPageComponents/VisionMission';
import Terms from '../Components/RegularComponents/Terms';
import styles from '../css/css.module.css';
import HiddenBerkeley
 from '../General_Components/NavBar';
function IndexPage() {
    return (
        <div className="fondo text-white body">
            
            <BackgroundImage />
            <HiddenBerkeley />
            <div className="container my-5 d-flex justify-content-center">
                <div className="row justify-content-center">
                    <Section
                        title={{ text: "Face your sins", alignment: "end" }}
                        content="If you make the effort to kill the world; why don't you watch it suffer? After all, it sure seems like you enjoy doing it."
                        button={{ text: "Start!" }}
                    />
                    <Section
                        title={{ text: "The Problem", alignment: "start" }}
                        content="We’re looking forward to helping solve the 15º UN goal “Life on Land.” In order to do this, we help people become aware of the damage and destruction these habitats are suffering."
                    />
                </div>
            </div>
            <hr />
            <section className="container my-5">
                <h3 className="text-center">Who to Blame</h3>
                <div className="row align-items-center mb-4 mt-5">
                    <Card
                        name="Pato"
                        image="https://www.excelsior.com.mx/media/pictures/2024/11/21/3216015.jpg"
                        description="A formidable young man with a heart as strong as his physique. With a passion for adventure fueled by the spirit of One Piece, he embodies the thrill of chasing dreams. When he’s not conquering the weights at the gym, you can find him vibing to the sounds of Travis Scott, Kendrick Lamar, and Don Toliver, their beats echoing his relentless drive."
                    />
                    <Card
                        name="Rodrigo"
                        image="https://i.pinimg.com/originals/31/6f/a6/316fa60c17c9bd0a2b22f3daf3087931.gif"
                        description="Pure Success"
                    />
                    <Card
                        name="Erasmo"
                        image="https://i.pinimg.com/originals/3c/a9/b7/3ca9b7055e3e645a6e1221e5c360474e.gif"
                        description="Shrouded in mystery, yet radiating warmth and kindness. He walks the fine line between shadow and light, drawing people in with an enigmatic charm.  Whether he’s lost in a book, exploring the outdoors, or engaging in thoughtful conversations, there’s always a sense that there’s more beneath the surface."
                    />
                </div>
            </section>
            <hr />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <VisionMission
                        type="Vision"
                        text="To cultivate a world where individuals and communities are empowered to confront pressing environmental challenges, fostering a sustainable relationship with nature that supports both ecosystems and human well-being. We envision a future where every person acknowledges their role in protecting the planet, actively engages in restoration efforts, and promotes solutions that ensure ecological balance."
                    />
                    <VisionMission
                        type="Mission"
                        text="Berkeley's Dilemma is dedicated to raising awareness and inspiring action towards the 15th UN Sustainable Development Goal: “Life on Land.” We strive to educate individuals about the importance of protecting terrestrial ecosystems and the biodiversity within them by showing the world how hypocrite and stupid their decisions are by utilizing the satire and irony. Our mission is to bridge the gap between knowledge and action, empowering everyone to be a steward of the earth."
                    />
                </div>
            </div>
            <hr />
            <Terms />
        </div>
    );
}

export default IndexPage;
