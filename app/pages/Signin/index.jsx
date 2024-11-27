import React from 'react';
import styles from '../public/css/signin.module.css'; // Sign-in specific styles
//import stylesG from '../css/global.module.css'; // Global styles
import SignInForm from './SignInComponents/SignInForm';

function SignIn() {
    return (
        <div className={styles.body}>
        <div className={styles.back_img}>
            <div className={styles.in_div}>
                <h2 className={styles.in_title}>Berkeley's Dilemma</h2>
                <div className={styles.login_container }>
                    <h3>Sign In</h3>
                    <SignInForm />
                </div>
            </div>
        </div>
        </div>
    );
}
//styles.login-scroll
export default SignIn;
