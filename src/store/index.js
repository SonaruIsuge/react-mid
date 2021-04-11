import { createContext, useReducer } from "react";
import bestSaleGoods from "../json/bestSellers.json";
import recommendGoods from "../json/recommend.json";
import {
   SET_NAVBAR_ACTIVEITEM,
   ADD_CART_ITEM
} from "../utils/constants";

export const StoreContext = createContext();

let cartItems = localStorage.getItem("cartItems")
? JSON.parse(localStorage.getItem("cartItems"))
: [];

const initialState = {
   page: {
      bestSaleGoods,
      recommendGoods,
   },
   navBar: {
      activeItem: "/home",
   },
   cartItems,
};

function reducer(state, action) {
   switch (action.type) {
      case SET_NAVBAR_ACTIVEITEM:
         return {
            ...state,
            navBar: {
               activeItem: action.payload
            }
         };
      
      case ADD_CART_ITEM:
         const item = action.payload;
         const product = state.cartItems.find((x) => x.id === item.id);
         if(product) {
            cartItems = state.cartItems.map((x) => x.id === product.id ? item : x);
            return {...state, cartItems}
         }
         cartItems = [...state.cartItems, item];
         return {...state, cartItems};
      
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