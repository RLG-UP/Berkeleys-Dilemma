import React, { useState } from 'react';
import Link from 'next/link';

function HiddenBerkeley() {
  const [sessUser, setSessUser] = useState(null); // You can set this state based on your authentication logic

  return (
    <div className="tt container">
      {/* Button to trigger offcanvas */}
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
        {/* Button for closing the offcanvas */}
        <button
          type="button"
          className="btn-close position-absolute top-0 start-0 m-4"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>

        {/* Account header */}
        <div className="offcanvas-header col-11 justify-content-end">
          <div
            className="offcanvas-Box"
            style={{ display: sessUser ? 'inline' : 'none' }}
          >
            <Link href="/user">
              <h2 className="btn primary-btn rounded-full">{sessUser ? sessUser.username : 'Log In'}</h2>
            </Link>
          </div>
          <div
            className="offcanvas-Box"
            style={{ display: sessUser ? 'none' : 'inline' }}
          >
            <Link href="/Login">
              <h2 className="btn primary-btn rounded-full">Log In</h2>
            </Link>
          </div>
        </div>

        {/* Links inside the offcanvas */}
        <div className="offcanvas-body text-end">
          <div className="offcanvas-Box call-action-btn rounded-buttons">
            <Link href="/IndexPage" className='a'>
              <h3 className="btn primary-btn rounded-full text-end w-100">HOME</h3>
            </Link>
          </div>

          <div className="offcanvas-Box call-action-btn rounded-buttons">
            <Link href="/Environment?envId=1">
              <h3 className="btn primary-btn rounded-full text-end w-100">AMAZON RAINFOREST</h3>
            </Link>
          </div>

          <div className="offcanvas-Box call-action-btn rounded-buttons">
            <Link href="/Environment?envId=2">
              <h3 className="btn primary-btn rounded-full text-end w-100">ANTARTIC</h3>
            </Link>
          </div>

          <div className="offcanvas-Box call-action-btn rounded-buttons">
            <Link href="/Environment?envId=3">
              <h3 className="btn primary-btn rounded-full text-end w-100">TAZMANIA</h3>
            </Link>
          </div>

          <div className="offcanvas-Box call-action-btn rounded-buttons">
            <Link href="/Map">
              <h3 className="btn primary-btn rounded-full text-end w-100">HURRICANE MAP</h3>
            </Link>
          </div>

          <div className="offcanvas-Box call-action-btn rounded-buttons">
            <Link href="/Game">
              <h3 className="btn primary-btn rounded-full text-end w-100">BERKELEY'S HUNT</h3>
            </Link>
          </div>

          {/* Conditional log-out button */}
          {sessUser && (
            <div className="offcanvas-Box call-action-btn rounded-buttons">
              <Link href="/log-out">
                <h3 className="log-out-btn btn primary-btn rounded-full text-end w-100 my-5">
                  Log Out
                </h3>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Page name */}
      <h4 className="PageName col-1 mt-5 p-10 w-50">Berkeley's Dilemma</h4>
    </div>
  );
}

export default HiddenBerkeley;