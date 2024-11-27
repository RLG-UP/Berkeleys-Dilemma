import React from 'react';

function Section({ title, content, button }) {
    return (
        <div className="col-12 col-md-12 col-lg-4 mx-2 my-5">
            <h3 className={`text-${title.alignment} mx-5`}>{title.text}</h3>
            <div className="text-card2 p-5">
                <div className="row align-items-center">
                    <div className="col-12 col-md-8 mb-3 mb-md-0">
                        <p>{content}</p>
                    </div>
                    {button && (
                        <div className="col-12 col-md-4 text-md-end text-right">
                            <button
                                className="start-btn col-10"
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

export default Section;
