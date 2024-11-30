import React from 'react';
import '../public/css/user.css'; 
import '../public/css/global.css'; 
import ProfileDetails from './ProfilePageComponents/ProfileDetails';

function ProfilePage({ user }) {
    return (
        <div className="back-img profile-page">
            <div className="in-div my-5 justify-content-center">
                <h2 className="in-title text-right">Your Profile</h2>
                <div className="profile-container mx-4">
                    <div className="row col-12 mx-2">
                        <div className="text-right col-md-6 col-12 p-3">
                            <h3 className="welcome-title">Welcome, {user.name}!</h3>
                        </div>
                        {/* Account Actions Column */}
                        <div className="col-md-6 col-12 my-3">
                            <div className="d-flex justify-content-start mx-3">
                                <button
                                    onClick={() => (window.location.href = '/edit-profile')}
                                    className="start-btn me-2"
                                >
                                    Edit Profile
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

                    <div className="row mx-2">
                        {/* Profile Details Column */}
                        <ProfileDetails user={user} />
                        <div className="col-md-6 my-4 text-center">
                            <i className="fa-solid fa-user fa-8x"></i>
                        </div>
                    </div>

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

export default ProfilePage;
