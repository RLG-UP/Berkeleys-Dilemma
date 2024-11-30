
import React, {useState, useEffect} from 'react';
import styles from '../css/account.module.css'; // Sign-in specific styles
import Link from 'next/link';
import { useBerkeleysContext, login } from '../../src/context/DirectoryProvider';
import { useRouter } from "next/router";

function Login() {
    const router = useRouter();
    const [dopple, setDopple] = useState(false);
    const { dispatch, state } = useBerkeleysContext();
    const [errorMessage, setErrorMessage] = useState(null);
    const [accountExists, setAccountExists] = useState(false);


    // Simulated login logic (replace with actual logic)
    const handleLogin = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');

        try {

            
            // Call the login function from DirectoryProvider
            const loginSuccess = await login(username, password, dispatch);

            // Update dopple state based on success
            setDopple(!loginSuccess);
            setErrorMessage(null);

            console.log("*((((((((((((((((", dopple);
            if (loginSuccess) {
                router.push('/IndexPage');
            } 
            
        } catch (error) {
            // If there's an error with the login, show the appropriate error message
            console.error("Login failed:", error);
            setErrorMessage('Incorrect Username or Password');
        }
    };


    return (
        <div className={styles.back_img}>
            <div className={styles.in_div}>
                <h2 className={styles.in_title}>Berkeley's Dilemma</h2>
                <div className={`${styles.login_container} `}>
                    <div className="text-center">
                        <h3>Log In</h3>
                        <p>
                            Make an account with a real email and remember your user and password (we encrypt it).
                            After that, check your inbox. This page functions as a real one completely.{' '}
                            <strong>Treat it as one.</strong>
                        </p>
                        <h6 className={styles.log_err_title}>
                            {dopple
                                ? 'User or Password Incorrect'
                                : errorMessage}
                        </h6>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="container-fluid">
                        <div className={styles.form_group}>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
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
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                name="password"
                                required
                            />
                        </div>

                        <button type="submit" className={`${styles.log_btn} col-12`}>
                            Log In
                        </button>

                        <div className="text-center mt-3">
                            <Link href="/Signin">Sign In</Link> or{' '}
                            <Link href="/IndexPage">Continue as Guest</Link>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
