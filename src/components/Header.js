import NavBar from './NavBar';
import logo from "../images/logo.png"
import CartSummary from "./CartSummary"

export default function Header(){
    return (
        <div className="header">
            <img alt="" className="header-icon" src={logo} />
            <NavBar />
            <CartSummary />
        </div>
    );
}