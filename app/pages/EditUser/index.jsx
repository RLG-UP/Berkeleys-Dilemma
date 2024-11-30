import React, { useState } from 'react';
import styles from '../css/user.module.css';
import { useBerkeleysContext, editUser } from '../../src/context/DirectoryProvider';
import { useRouter } from "next/router";

function EditUser({ user }) {
    const { dispatch, state } = useBerkeleysContext();
    const router = useRouter();

    const [profile, setProfile] = useState({
        name: state.user.name,
        username: state.user.username,
        email: state.user.email,
        bestScore: state.user.bestScore,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the editUser function to save the updated profile
            await editUser(state.user._id, profile.name, profile.username, profile.email, dispatch);

            // On success, you can redirect or show a success message
            router.push('/Profile');
        } catch (error) {
            // Handle error (e.g., show an error message)
            setErrorMessage('Error updating profile. Please try again.');
        }
    };

    return (
        <div className={`${styles.back_img} ${styles.profile_page}`}>
            <div className={`${styles.in_div} my-5 justify-content-center`}>
                <h2 className={`${styles.in_title} text-right`}>Edit Your Profile</h2>
                <div className={`${styles.profile_container} mx-4`}>
                    <div className="row col-12 mx-2">
                        <div className={`${styles.text_right} col-md-6 col-12 p-3`}>
                            <h3 className={styles.welcome_title}>
                                <em>Edit Mode</em>
                            </h3>
                        </div>
                        {/* Account Actions */}
                        <div className="col-md-6 col-12 my-3">
                            <div className="d-flex justify-content-start mx-3">
                                <button
                                    type="submit"
                                    form="profileForm"
                                    className={`${styles.start_btn} me-2`}
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => (window.location.href = '/log-out')}
                                    className={styles.start_btn}
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>

                    <form id="profileForm" onSubmit={handleSubmit}>
                        <div className="row mx-2">
                            {/* Profile Details */}
                            <div className="col-md-6 mb-3">
                                <h5 className={styles.profile_section_title}>Profile Details</h5>
                                <ul className={`list-group ${styles.profile_details}`}>
                                    <li className="list-group-item">
                                        <em>Name:</em>
                                        <input
                                            type="text"
                                            name="name"
                                            value={profile.name}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </li>
                                    <li className="list-group-item">
                                        <em>Username:</em>
                                        <input
                                            type="text"
                                            name="username"
                                            value={profile.username}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </li>
                                    <li className="list-group-item">
                                        <em>Email:</em>
                                        <input
                                            type="email"
                                            name="email"
                                            value={profile.email}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </li>
                                </ul>
                            </div>
                            {/* User Avatar */}
                            <div className="col-md-6 my-4 text-center">
                                <i className="fa-solid fa-user fa-8x"></i>
                            </div>
                        </div>
                    </form>

                    {/* Back to Home Link */}
                    <div className="text-right mt-4 mx-4">
                        <a href="/index" className={styles.back_home_link}>
                            Back to Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUser;
