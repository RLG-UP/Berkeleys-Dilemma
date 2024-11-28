import { SIGNIN, LOGIN, LOGOUT, EDIT_INFO, SEND_EMAIL } from './actions';

function DirectoryReducer(state, action) {
    switch (action.type) {
        case SIGNIN:
            return {
                ...state,
                user: action.payload,  // Update user state after sign-in
            };
        case LOGIN:
            return {
                ...state,
                user: action.payload,  // Update user state after login
            };
        case LOGOUT:
            return {
                ...state,
                user: {},  // Clear user data on logout
            };
        case EDIT_INFO:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,  // Update the user details
                },
            };
        case UPDATE_SCORE:
            return {
                ...state,
                bestScore: action.payload,  // Update the bestScore
            };
        default:
            throw new Error(`Unsupported action ${action.type}`);
    }
}

export default DirectoryReducer;
