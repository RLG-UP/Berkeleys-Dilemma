import { SIGNIN, LOGIN, LOGOUT, EDIT_INFO, UPDATE_SCORE, UPDATE_TOP, FAKE_LOG } from './actions';

function DirectoryReducer(state, action) {
    switch (action.type) {
        case SIGNIN:
            return {
                ...state,
                user: action.payload,  // Update user state after sign-in
                dopple: false,
            };
        case LOGIN:
            return {
                ...state,
                user: action.payload,  // Update user state after login
                loggedState: true,
                dopple: false,
            };
        case LOGOUT:
            return {
                ...state,
                user: {},  // Clear user data on logout
                loggedState: false,
                dopple: false,
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
        case UPDATE_TOP:
            return{
                ...state,
                topUsers: action.payload,
            };
        case FAKE_LOG:
            return{
                ...state,
                dopple: action.payload,
            };

        default:
            throw new Error(`Unsupported action ${action.type}`);
    }
}

export default DirectoryReducer;
