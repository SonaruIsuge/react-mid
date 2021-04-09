import { Link } from "react-router-dom";

export default function BestSeller({bestSellGoods}) {
    return (
        <div className="best-seller">
            <p className="best-seller-title">BEST SELLERS</p>
            <div className="best-seller-list">
                {bestSellGoods.map(product => (
                    <div className="best-product">
                        <Link to="###" className="best-product-link">
                            <img alt={product.category} className="best-product-img" src={product.image} />
                        </Link>
                        <hr className="best-product-line" />
                        <p className="best-product-category">
                            {product.category.toUpperCase()}
                        </p>
                        <p className="best-product-flavor">
                            {product.flavor}
                        </p>
                        <p className="best-product-price">
                            $ {product.price}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}