import React from 'react';
import styles from '../../css/css.module.css';

function VisionMission({ type, text }) {
    return (
        <div className="col-12 col-md-12 col-lg-5 mx-5 my-5">
            <h3 className={`text-${type === "Vision" ? "start" : "end"} mx-5`}>{type}</h3>
            <div className={`${styles.text_card2} p-4 text-${type === "Vision" ? "end" : "start"}`}>
                <p>{text}</p>
            </div>
        </div>
    );
}

export default VisionMission;