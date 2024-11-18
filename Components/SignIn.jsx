import React from 'react';
import './signin.css'; // Sign-in specific styles
import './global.css'; // Global styles
import SignInForm from './SignInForm';

function SignIn() {
    return (
        <div className="back-img">
            <div className="in-div">
                <h2 className="in-title">Berkeley's Dilemma</h2>
                <div className="login-container login-scroll">
                    <h3>Sign In</h3>
                    <SignInForm />
                </div>
            </div>
        </div>
    );
}

export default SignIn;
