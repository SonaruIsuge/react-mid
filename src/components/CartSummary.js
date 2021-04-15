import { useContext } from "react";
import { Link, Badge } from "antd";
import cartIcon from "../images/Shopping-cart-icon.png"
import {StoreContext} from "../store"

export default function CartSummary() {
    const { state: { cartItems } } = useContext(StoreContext);

    const count = (cartItems.length > 0) ?
    cartItems.reduce((sum, item) => sum + item.qty, 0)
    : 0;

    return (
        <Link 
            className="cart-link"
            to="/shoppingCart"
        >
            <Badge count={count} className="cart-badge">
                <img alt="cart" src={cartIcon} className="cart-img"></img>
            </Badge>
        </Link>
    );
}