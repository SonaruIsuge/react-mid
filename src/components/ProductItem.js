import { useContext, useState, useEffect } from "react";
import { Select, Button } from 'antd';
import { addCartItem, openNotification } from "../actions";
import { StoreContext } from "../store";

const { Option } = Select;

export default function ProductItem({widthDif, product, moveStyle, customize}) {
    const { state: {cartItems}, dispatch } = useContext(StoreContext);

    const [flavor, setFlavor] = useState(product.flavor.length > 1 ? product.flavor[0] : product.flavor);

    const addToCart = () => {
        openNotification();
        addCartItem(
            dispatch, 
            product, 
            flavor, 
            product.color?product.color:null, 
            product.decoration, 
            product.decoration.color?product.decoration.color:null, 
            product.message, 
            product.price, 
            1
        );
    }
    
    // LocalSortage
    useEffect(()=>{
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems])

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
                    {product.flavor[0]}
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