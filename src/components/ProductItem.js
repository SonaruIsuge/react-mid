import { Link } from "react-router-dom";
import { useState } from "react";
import { Select } from 'antd';
import Product from "../pages/Product";

const { Option } = Select;

export default function ProductItem({listWidth, fullWidth, product, moveStyle}) {
    const [flavor, setFlavor] = useState(product.flavor.length > 1 ? product.flavor[0] : product.flavor);

    return (
        <div className={`product ${listWidth < fullWidth ? "moveable" : ""}`} key={product.id} style={moveStyle}>
            <Link to="###" className="product-link">
                <img alt={product.category} className="product-img" src={(product.image)} />
            </Link>
            <hr className="product-line" />
            <p className="product-category">
                {product.category.toUpperCase()}
            </p>
            {product.flavor.length > 1 ? (
                <Select
                    defaultValue={product.flavor[0]}
                    className="product-select-style"
                    onChange={val => setFlavor(val)}
                >
                    {[...Array(product.flavor.length).keys()].map((x) => (
                        <Option value={product.flavor[x]}>
                            {product.flavor[x]}
                        </Option>
                    ))}
                </Select>
            ) : (
                <p className="product-flavor">
                    {product.flavor}
                </p>
            )}
            
            <p className="product-price">
                ${product.price}
            </p>
        </div>
    );
}