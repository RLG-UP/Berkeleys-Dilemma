import React from 'react';
import '../../pages/css/signin.css'; // Sign-in specific styles
import '../../pages/css/global.css'; // Global styles
import SignInForm from './SignInComponents/SignInForm';

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
