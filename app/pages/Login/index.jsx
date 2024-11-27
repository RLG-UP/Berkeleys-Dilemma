'use client'

import React, {useState} from 'react';
import styles from '../css/account.module.css'; // Sign-in specific styles

function Login() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [accountExists, setAccountExists] = useState(false);

    // Simulated login logic (replace with actual logic)
    const handleLogin = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');

        // Example: Replace this with your login validation logic
        if (username === 'test' && password === 'test') {
            setErrorMessage(null);
            alert('Login successful!');
        } else if (username === 'existingUser') {
            setAccountExists(true);
        } else {
            setErrorMessage('Incorrect Username or Password');
        }
    };

    return (
        <div className={styles.back_img}>
            <div className={styles.in_div}>
                <h2 className={styles.in_title}>Berkeley's Dilemma</h2>
                <div className={styles.login_container}>
                    <div className={styles.text_center}>
                        <h3>Log In</h3>
                        <p>
                            Make an account with a real email and remember your user and password (we encrypt it).
                            After that, check your inbox. This page functions as a real one completely.{' '}
                            <strong>Treat it as one.</strong>
                        </p>
                        <h6 className={styles.log_err_title}>
                            {accountExists
                                ? 'That account already exists'
                                : errorMessage}
                        </h6>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="container-fluid">
                        <div className={styles.form_group}>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className={styles.form_control}
                                id="username"
                                placeholder="Enter your username"
                                name="username"
                                required
                            />
                        </div>
                        <div className={styles.form_group}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className={styles.form_control}
                                id="password"
                                placeholder="Enter your password"
                                name="password"
                                required
                            />
                        </div>

                        <button type="submit" className={`${styles.log_btn} col-12}`}>
                            Log In
                        </button>

                        <div className={`${styles.text_center} mt-3`}>
                            <a href="/signin">Sign In</a> or{' '}
                            <a href="/index">Continue as Guest</a>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
