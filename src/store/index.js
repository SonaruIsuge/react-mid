import { createContext, useReducer } from "react";
import useReducerWithThunk from 'use-reducer-thunk';
import bestSaleGoods from "../json/bestSellers.json";
import recommendGoods from "../json/recommend.json";
import productCake from "../json/orderCake.json";
import productTart from "../json/productTart.json";
import productBrownie from "../json/productBrownie.json";
import customizeColor from "../json/color.json";
import customizeDecoration from "../json/decoration.json";
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
      productCake,
      productTart,
      productBrownie,
   },
   navBar: {
      activeItem: "/home",
   },
   customize: {
      customizeColor,
      customizeDecoration,
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

      default:
         return state;
   }
}

export function StoreProvider(props) {
   const [state, dispatch] = useReducerWithThunk(reducer, initialState, "example");
   const value = { state, dispatch };
 
   return (
      <StoreContext.Provider value={value}>
         {props.children}
      </StoreContext.Provider>
   );
}