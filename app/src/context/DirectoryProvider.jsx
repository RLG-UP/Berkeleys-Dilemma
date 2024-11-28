import React, { createContext, useContext, useReducer } from 'react';
import DirectoryReducer from './DirectoryReducer';
import { SIGNIN, LOGIN, LOGOUT, EDIT_INFO, SEND_EMAIL } from './actions';
import api from '../../api/api';

const DirectoryContext = createContext();

function DirectoryProvider({ children }) {
    const initialState = {
        user: {},
        emailStatus: null,  // Store email sending status
    };
    
    const [state, dispatch] = useReducer(DirectoryReducer, initialState);

    

    return (
        <DirectoryContext.Provider value={{ state, dispatch, login, signIn, sendEmail, updateScore }}>
            {children}
        </DirectoryContext.Provider>
    );
}

function useBerkeleysContext() {
    return useContext(DirectoryContext);
}

// Function to trigger login
async function login(username, password) {
    try {
        const res = await api.post('/login', { username, password });
        if (res.data.statusCode === 1) {
            dispatch({ type: LOGIN, payload: res.data.user });
        } else {
            dispatch({ type: LOGIN, payload: null });
        }
    } catch (error) {
        console.error("Error logging in:", error);
    }
}

// Function to trigger sign-in
async function signIn(email, name, username, password) {
    try {
        const res = await api.post('/signin', { email, name, username, password });
        if (res.data.right_pass) {
            dispatch({ type: SIGNIN, payload: { email, name, username } });
        } else {
            dispatch({ type: SIGNIN, payload: null });
        }
    } catch (error) {
        console.error("Error signing in:", error);
    }
}

// Function to send email after sign-in or update
async function sendEmail(email) {
    try {
        const res = await api.post('/send-email', { email });
        dispatch({ type: SEND_EMAIL, payload: res.data.status });
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

async function updateScore(userId, score, dispatch) {
    try {
        const res = await api.put('/update-score', { userId, score });
        if (res.data.bestScore !== undefined) {
            dispatch({ type: UPDATE_SCORE, payload: res.data.bestScore });  // Dispatch the bestScore
        } else {
            console.error("Error updating score:", res.data.message);
        }
    } catch (error) {
        console.error("Error updating score:", error);
    }
}


export default DirectoryProvider;
export { useBerkeleysContext, login, signIn, sendEmail, updateScore };
