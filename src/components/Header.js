import NavBar from './NavBar';
import logo from "../images/logo.png"

export default function Header(){
    return (
        <div className="header">
            <img alt="" className="header-icon" src={logo} />
            <NavBar />
        </div>
    );
}