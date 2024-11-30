import React from 'react';

function ProfileDetails({ user }) {
    return (
        <div className="col-md-6 mb-3">
            <h5 className="profile-section-title">Profile Details</h5>
            <ul className="list-group profile-details">
                <li className="list-group-item">
                    <em>Name:</em> {user.name}
                </li>
                <li className="list-group-item">
                    <em>Username:</em> {user.username}
                </li>
                <li className="list-group-item">
                    <em>Email:</em> {user.email}
                </li>
            </ul>
        </div>
    );
}

export default ProfileDetails;
