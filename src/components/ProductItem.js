import { useContext, useState, useEffect } from "react";
import { Select, Button } from 'antd';
import { addCartItem } from "../actions";
import { StoreContext } from "../store";

const { Option } = Select;

export default function ProductItem({widthDif, product, moveStyle, customize}) {
    const { state: {cartItems}, dispatch } = useContext(StoreContext);

    const [flavor, setFlavor] = useState(product.flavor.length > 1 ? product.flavor[0] : product.flavor);

    const addToCart = () => {
        addCartItem(dispatch, product, flavor, null, null, product.price, 1);
    }

    useEffect(()=>{
        console.log(cartItems);
    }, [cartItems])

    return (
        <div className={`product ${widthDif > 0 ? "moveable" : ""}`} key={product.id} style={moveStyle}>
            <img alt={product.category? product.category:product.flavor} className="product-img" src={(product.image)} />
            <hr className="product-line" />
            <p className="product-category">
                {product.category?.toUpperCase()}
            </p>
            {product.flavor.length > 1 ? (
                <Select
                    defaultValue={flavor}
                    className="product-select-style"
                    onChange={val => setFlavor(val)}
                    bordered={false}
                    
                >
                    {[...Array(product.flavor.length).keys()].map((x) => (
                        <Option value={product.flavor[x]} key={`${product.category}-${product.flavor[x]}`}>
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
            <Button 
                className="product-btn"
                onClick={customize? "" : addToCart}
                href={customize? `/productCustomize/${product.id}` : null}
            >
                <span className="product-btn-span">{customize ? "Choose" : "Add To Cart"}</span>
            </Button>
        </div>
    );
}