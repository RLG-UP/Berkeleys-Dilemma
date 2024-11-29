import React from 'react';
import styles from '../css/user.module.css'; 
import ProfileDetails from './ProfilePageComponents/ProfileDetails';
import { useBerkeleysContext, logout } from '../../src/context/DirectoryProvider';
import Link from 'next/link';

import { useRouter } from "next/router";

function ProfilePage() {
    const {state, dispatch} = useBerkeleysContext();

    const router = useRouter();
    function handleLogout(){
        logout(dispatch);
        router.push('/Login');
    
      }
    return (
        <div className={`${styles.back_img} ${styles.profile_page}`}>
            <div className={`${styles.in_div} my-5 justify-content-center`}>
                <h2 className={`${styles.in_title} text-right`}>Your Profile</h2>
                <div className={`${styles.profile_container} mx-4`}>
                    <div className="row col-12 mx-2">
                        <div className={`${styles.text_right} col-md-6 col-12 p-3`}>
                            <h3 className={styles.welcome_title}>Welcome, {state.user.name}!</h3>
                        </div>
                        {/* Account Actions Column */}
                        <div className="col-md-6 col-12 my-3">
                            <div className="d-flex justify-content-start mx-3">
                                <Link href = '/EditUser'
                                    className={`${styles.start_btn} me-2`}
                                >
                                    Edit Profile
                                </Link>
                                <button onClick={handleLogout} className={`${styles.button}  p-1`}>
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="row mx-2">
                        {/* Profile Details Column */}
                        <ProfileDetails user={state.user} />
                        <div className="col-md-6 my-4 text-center">
                            <i className="fa-solid fa-user fa-8x"></i>
                        </div>
                    </div>

                    <div className="text-right mt-4 mx-4">
                        <Link href="/IndexPage" className={styles.back_home_link}>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
