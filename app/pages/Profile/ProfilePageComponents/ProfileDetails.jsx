import React from 'react';
import { useBerkeleysContext } from '../../../src/context/DirectoryProvider';

function ProfileDetails() {
    const {state} = useBerkeleysContext();

    return (
        <div className="col-md-6 mb-3">
            <h5 className="profile-section-title">Profile Details</h5>
            <ul className="list-group profile-details">
                <li className="list-group-item">
                    <em>Name:</em> {state.user.name}
                </li>
                <li className="list-group-item">
                    <em>Username:</em> {state.user.username}
                </li>
                <li className="list-group-item">
                    <em>Email:</em> {state.user.email}
                </li>
            </ul>
        </div>
    );
}

export default ProfileDetails;
