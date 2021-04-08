import { createContext, useReducer } from "react";
import {
    SET_NAVBAR_ACTIVEITEM
} from "../utils/constants";

export const StoreContext = createContext();

const initialState = {
    navBar: {
       activeItem: "/home",
    },
    cartItems: [],
 };

 let cartItems = {};

 function reducer(state, action) {
    switch (action.type) {
        case SET_NAVBAR_ACTIVEITEM:
         return {
            ...state,
            navBar: {
               activeItem: action.payload
            }
         };
    }
 }

 export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
 
    return (
       <StoreContext.Provider value={value}>
          {props.children}
       </StoreContext.Provider>
    );
 }