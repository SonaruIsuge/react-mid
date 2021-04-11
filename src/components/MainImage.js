import { Link } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../store";
import { setActiveNavItem } from "../actions"
import homeBigImg from "../images/home-big.png"

export default function MainImage() {
    const { dispatch } = useContext(StoreContext);

    const onClick = () => {
        setActiveNavItem(dispatch, "/product");
    }
    return (
        <div className="main-image-block">
            <p className="main-image-text"> 
                START<br />
                ORDERING<br />
                EXCLUSIVE<br />
                CAKES
            </p>
            <Link to='/product' onClick={ onClick } className="product-link">
                <div className="main-image-btn">                    
                    <p>GO &gt;</p>                    
                </div>
            </Link>
            <img alt="" className="main-image" src={homeBigImg}></img>
        </div>
    );
}