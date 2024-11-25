import {SIGNIN, LOGIN, LOGOUT, EDIT_INFO} from "./actions";

function DirectoryReducer(state, action){
    switch(action.type){
        case SIGNIN: return{
            ...state,
        }
        case LOGIN: return{
            ...state,
        }
        case LOGOUT: return{
            ...state,
        }
        case EDIT_INFO: return{
            ...state,
        }
        default: throw new Error(`Unsupported action ${action.type}`);
    }
}

export default DirectoryReducer;