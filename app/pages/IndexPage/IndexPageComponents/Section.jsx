import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../css/css.module.css';

function Section({ title, content, button }) {
    return (
        <div className="col-12 col-md-12 col-lg-4 mx-2 my-5">
            <h3 className={`text-${title?.alignment || 'left'} mx-5`}>
                {title?.text || 'Default Title'}
            </h3>
            <div className={`${styles.text_card2} p-5`}>
                <div className="row align-items-center">
                    <div className="col-12 col-md-8 mb-3 mb-md-0">
                        <p>{content}</p>
                    </div>
                    {button && (
                        <div className="col-12 col-md-4 text-md-end text-right">
                            <button
                                className={`${styles.start_btn} col-10`}
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasWithBackdrop"
                                aria-controls="offcanvasWithBackdrop"
                            >
                                {button.text}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

Section.propTypes = {
    title: PropTypes.shape({
        alignment: PropTypes.string,
        text: PropTypes.string,
    }),
    content: PropTypes.string.isRequired,
    button: PropTypes.shape({
        text: PropTypes.string,
    }),
};

Section.defaultProps = {
    title: { alignment: 'left', text: 'Default Title' },
    button: null,
};

export default Section;
