import { Link } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../store";
import { setActiveNavItem } from "../actions";

export default function NavItem(props){
    const { children, to, className, activeClassName } = props;
    const { state, dispatch } = useContext(StoreContext);

    const onClick = () => {
        setActiveNavItem(dispatch, to);
    }

    return(
        <Link to={to} onClick={onClick} className="nav-link">
            <div onClick={onClick} className={`${state.navBar.activeItem === to ? "nav-item-circle" : "nav-item-circle--hide"}`}></div>
            <div
                onClick={onClick}
                className={`
                ${className} 
                ${state.navBar.activeItem === to ? activeClassName : ""}`}
            >
                {children}
            </div>
        </Link>
    );
}