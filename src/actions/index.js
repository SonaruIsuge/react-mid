import {
    SET_NAVBAR_ACTIVEITEM,
    ADD_CART_ITEM,
    REMOVE_CART_ITEM
} from "../utils/constants"

export const setActiveNavItem = (dispatch, activeNavItem) => {
    dispatch({
        type: SET_NAVBAR_ACTIVEITEM,
        payload: activeNavItem,
    });
}

export const addCartItem = (dispatch, product, flavor, color, decoration, message, price, qty) => {
  const item = {
    id: product.id,
    category: product.category,
    image: product.image,
    flavor,
    color,
    decoration,
    message,
    price,
    qty,
  };
  dispatch({
    type: ADD_CART_ITEM,
    payload: item,
  });
  console.log(item);
};

export const removeCartItem = (dispatch, productId) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: productId,
  });
}