import React from 'react';

function NavBar({ sessUser }) {
    return (
        <div className="tt container">
            {/* Button to toggle offcanvas menu */}
            <button
                className="btn fixed-button border col-1 mt-5 p-10 w-10 offset-10"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasWithBackdrop"
                aria-controls="offcanvasWithBackdrop"
                data-bs-placement="end"
            >
                =
            </button>

            {/* Offcanvas menu */}
            <div
                className="offcanvas offcanvas-end"
                tabIndex="-1"
                id="offcanvasWithBackdrop"
                aria-labelledby="offcanvasWithBackdropLabel"
            >
                {/* Close button positioned at the top-left corner */}
                <button
                    type="button"
                    className="btn-close position-absolute top-0 start-0 m-4"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>

                {/* ACCOUNT title aligned to the right */}
                <div className="offcanvas-header col-11 justify-content-end">
                    {/* Display the user's username if logged in, otherwise show "Log In" */}
                    {sessUser ? (
                        <div className="offcanvas-Box">
                            <a href="/user" className="btn primary-btn rounded-full">
                                <h3>{sessUser.username}</h3>
                            </a>
                        </div>
                    ) : (
                        <div className="offcanvas-Box">
                            <a href="/" className="btn primary-btn rounded-full">
                                <h3>Log In</h3>
                            </a>
                        </div>
                    )}
                </div>

                {/* Menu links aligned to the right */}
                <div className="offcanvas-body text-end">
                    <div className="offcanvas-Box call-action-btn rounded-buttons">
                        <a href="/index" className="btn primary-btn rounded-full text-end w-100">HOME</a>
                    </div>

                    <div className="offcanvas-Box call-action-btn rounded-buttons">
                        <a href="/environment" className="btn primary-btn rounded-full text-end w-100">1ST ENVIRONMENT</a>
                    </div>

                    <div className="offcanvas-Box call-action-btn rounded-buttons">
                        <a href="/environment2" className="btn primary-btn rounded-full text-end w-100">2ND ENVIRONMENT</a>
                    </div>

                    <div className="offcanvas-Box call-action-btn rounded-buttons">
                        <a href="/environment3" className="btn primary-btn rounded-full text-end w-100">3RD ENVIRONMENT</a>
                    </div>

                    <div className="offcanvas-Box call-action-btn rounded-buttons">
                        <a href="/map" className="btn primary-btn rounded-full text-end w-100">HURRICANE MAP</a>
                    </div>

                    {/* Log out button only visible if the user is logged in */}
                    {sessUser && (
                        <div className="offcanvas-Box call-action-btn rounded-buttons">
                            <a
                                href="/log-out"
                                className="log-out-btn btn primary-btn rounded-full text-end w-100 my-5"
                            >
                                <h5>Log Out</h5>
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Page name */}
            <h7 className="PageName col-1 mt-5 p-10 w-50">Berkeley's Dilemma</h7>
        </div>
    );
}

export default NavBar;
