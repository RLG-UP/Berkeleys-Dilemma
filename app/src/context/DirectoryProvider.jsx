import React, {createContext, useContext, useReducer} from "react";
import DirectoryReducer
 from "./DirectoryReducer";
import {SIGNIN, LOGIN, LOGOUT, EDIT_INFO} from "./actions";
import api from "../../api/api";

const DirectoryContext = createContext();

function DirectoryProvider({children}){
    const initialState = {
        user: {},
    }
    const [state, dispatch] = useReducer(DirectoryReducer, initialState);

    return(
        <DirectoryContext.Provider value={{state,dispatch}}>
            {children}
        </DirectoryContext.Provider>
    );
}

function useBerkeleysContext(){
    return useContext(DirectoryContext);
}

async function login(){
    try{
        const res = await api.post("/login", {user});
        if(res.data.statusCode === 1)
    }
}

export default DirectoryProvider;
export {useBerkeleysContext};