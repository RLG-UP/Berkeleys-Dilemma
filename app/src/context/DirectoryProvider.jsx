import React, { createContext, useContext, useReducer } from 'react';
import DirectoryReducer from './DirectoryReducer';
import { SIGNIN, LOGIN, LOGOUT, EDIT_INFO, UPDATE_SCORE } from './actions';
import api from '../../api/api';

const DirectoryContext = createContext();

function DirectoryProvider({ children }) {
    const initialState = {
        user: {bestScore:0},
        loggedState: false,
        apiKey: process.env.MAP_PASS,

    };
    
    const [state, dispatch] = useReducer(DirectoryReducer, initialState);

    

    return (
        <DirectoryContext.Provider value={{ state, dispatch, login, signIn, updateScore }}>
            {children}
        </DirectoryContext.Provider>
    );
}

function useBerkeleysContext() {
    return useContext(DirectoryContext);
}

// Function to trigger login
async function login(username, password, dispatch) {
    try {
        const res = await api.post('/login', { username, password });
        if (res.data.success) {

            dispatch({ type: LOGIN, payload: res.data.user });
        } else {
            dispatch({ type: LOGIN, payload: null });
        }
    } catch (error) {
        console.error("Error logging in:", error);
    }
}

// Function to trigger sign-in
async function signIn(email, name, username, password, dispatch) {
    console.log("Axios API Instance:", api);
    try {
        console.log("--->Requesting to: /signin")
        const res = await api.post('/signin', { email, name, username, password });
        console.log("Response from sign-in:", res);
        if (res.data.success) {
            var bestScore = 0;
            dispatch({ type: SIGNIN, payload: { email, name, username, bestScore } });
        } else {
            dispatch({ type: SIGNIN, payload: null });
            console.log(res.data.message); // Log the error message if the passwords don't match
        }
    } catch (error) {
        console.error("Error signing in:", error);
    }
}

// Function to edit user details (name, username, email)
async function editUser(userId, name, username, email, dispatch) {
    try {
        const res = await api.post('/save-profile', { userId, name, username, email });
        
        if (res.status === 200) {
            // Update the user state with the new values after the profile update
            dispatch({ type: EDIT_INFO, payload: { name, username, email } });
        } else {
            console.error("Error updating user profile:", res.data.message);
        }
    } catch (error) {
        console.error("Error editing user profile:", error);
    }
}

async function updateScore(dispatch, userId, score) {
    console.log("---->Trying to update score");
    try {
        const res = await api.post('/update-score', { userId, score });
        if (res.data.bestScore !== undefined) {
            dispatch({ type: UPDATE_SCORE, payload: res.data.bestScore });  // Dispatch the bestScore
        } else {
            console.error("Error updating score:", res.data.message);
        }
    } catch (error) {
        console.error("Error updating score:", error);
    }
}

async function logout(dispatch){
    try{

        dispatch({type: LOGOUT, payload: null});

    }catch(error){
        console.error("Error Logging Out: ", error);
    }
}

export default DirectoryProvider;
export { useBerkeleysContext, login, signIn, editUser, updateScore, logout};
