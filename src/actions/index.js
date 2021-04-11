import {
    SET_NAVBAR_ACTIVEITEM,
    ADD_CART_ITEM
} from "../utils/constants"

export const setActiveNavItem = (dispatch, activeNavItem) => {
    dispatch({
        type: SET_NAVBAR_ACTIVEITEM,
        payload: activeNavItem,
    });
}

export const addCartItem = (dispatch, product, qty) => {
    const item = {
      id: product.id,
      category: product.category,
      flavor: product.flavor,
      price: product.price,
      image: product.image,
      qty,
    };
    dispatch({
      type: ADD_CART_ITEM,
      payload: item,
    });
  };