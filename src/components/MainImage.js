import { Link } from "react-router-dom"

export default function MainImage() {
    return (
        <div className="main-image-block">
            <p className="main-image-text"> 
                START<br />
                ORDERING<br />
                EXCLUSIVE<br />
                CAKES
            </p>
            <div className="main-image-btn">
                <Link to='/product' className="product-link">
                    <p>GO &gt;</p>
                </Link>
            </div>
            <img alt="" className="main-image" src="###"></img>
        </div>
    );
}