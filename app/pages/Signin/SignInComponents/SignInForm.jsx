import React, { useState } from 'react';
import styles from '../../css/signin.module.css'; 
import Link from 'next/link';
import { useBerkeleysContext, signIn } from '../../../src/context/DirectoryProvider';
import { useRouter } from "next/router";

function SignInForm() {
    const router = useRouter();
    const { dispatch } = useBerkeleysContext(); 
    const [rightPass, setRightPass] = useState(true); // Replace with your validation logic
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        username: '',
        password: '',
        confPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confPassword) {
            setRightPass(false);  // Show error if passwords don't match
        } else {
            try {
                // Call the signIn function from DirectoryProvider
                signIn(formData.email, formData.name, formData.username, formData.password, dispatch);

                // Handle success: You could redirect or show a success message
                router.push('/Login');
            } catch (error) {
                // Handle any errors that occur during sign-in
                console.error("Sign In failed:", error);
                setRightPass(false);  // Optionally set an error state here
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your e-mail"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">
                    {rightPass ? 'Password' : null}
                </label>
                {!rightPass && (
                    <h7 className="incorrect-pass">Passwords don't match</h7>
                )}
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="confPassword">Confirm Password</label>
                <input
                    type="password"
                    name="confPassword"
                    className="form-control"
                    id="confPassword"
                    placeholder="Confirm your password"
                    value={formData.confPassword}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit" className={`${styles.log_btn} col-12`}>
                Sign In
            </button>

            <div className="text-center mt-3">
                <Link href="/Login">Log In</Link> or{' '}
                <Link href="/IndexPage">Continue as Guest</Link>
            </div>
            </div>
        </form>
    );
}

export default SignInForm;
