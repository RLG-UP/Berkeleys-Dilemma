import React from 'react';
//import Navbar from './Navbar';
import BackgroundImage from './IndexPageComponents/BackgroundImage';
import Section from './IndexPageComponents/Section';
import Card from './IndexPageComponents/Card';
import VisionMission from './IndexPageComponents/VisionMission';
import Terms from './Terms';
import '../../pages/css/css.css';
import "../../pages/css/global.css";

function IndexPage() {
    return (
        <div className="fondo text-white">
            
            <BackgroundImage />
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
                        image="./img/Yo.jpg"
                        description="A formidable young man with a heart as strong as his physique..."
                    />
                    <Card
                        name="Rodrigo"
                        image="./img/Rodrigo.jpg"
                        description="With a soul that craves the rhythm of music and the whispers of philosophy..."
                    />
                    <Card
                        name="Erasmo"
                        image="./img/Erasmo.jpg"
                        description="Shrouded in mystery, yet radiating warmth and kindness..."
                    />
                </div>
            </section>
            <hr />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <VisionMission
                        type="Vision"
                        text="To cultivate a world where individuals and communities are empowered..."
                    />
                    <VisionMission
                        type="Mission"
                        text="Berkeley's Dilemma is dedicated to raising awareness..."
                    />
                </div>
            </div>
            <hr />
            <Terms />
        </div>
    );
}

export default IndexPage;
