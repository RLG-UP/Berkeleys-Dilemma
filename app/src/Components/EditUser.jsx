import React, {useState} from 'react';
import '../../pages/css/user.css'; 
import '../../pages/css/global.css'; 

function EditUser({ user }) {
    const [profile, setProfile] = useState({
        name: user.name,
        username: user.username,
        email: user.email,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Profile saved:', profile);

        // Add your API call logic here to save the profile
    };

    return (
        <div className="back-img profile-page">
            <div className="in-div my-5 justify-content-center">
                <h2 className="in-title text-right">Edit Your Profile</h2>
                <div className="profile-container mx-4">
                    <div className="row col-12 mx-2">
                        <div className="text-right col-md-6 col-12 p-3">
                            <h3 className="welcome-title">
                                <em>Edit Mode</em>
                            </h3>
                        </div>
                        {/* Account Actions */}
                        <div className="col-md-6 col-12 my-3">
                            <div className="d-flex justify-content-start mx-3">
                                <button
                                    type="submit"
                                    form="profileForm"
                                    className="start-btn me-2"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => (window.location.href = '/log-out')}
                                    className="start-btn"
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
                                <h5 className="profile-section-title">Profile Details</h5>
                                <ul className="list-group profile-details">
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
                        <a href="/index" className="back-home-link">
                            Back to Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUser;
