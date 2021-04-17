import { useEffect, useContext } from "react";
import  { Col, Row, Button, Select } from "antd";
import { StoreContext } from "../store";
import { addCartItem, removeCartItem } from "../actions";

const {Option} = Select;

export default function CartDetail() {
    const { state: { cartItems }, dispatch } = useContext(StoreContext);

    // LocalSortage
    useEffect(()=>{
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems])

    const getTotalPrice = () => {
        return (cartItems.length > 0) ?
            cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
            : 0;
    }

    const calShippingPrice = () => {
        if(getTotalPrice() < 300 && getTotalPrice() > 0)
            return 60;
        else return 0;
    }

    return (
        <Row className="cart-detail">
            <Col
                sm={{span: 24}}
                md={{span: 15, offset: 1}}
                className="cart-content"
            >
                <p className="cart-title">SHOPPING CART</p>
                <hr className="cart-line" />
                {cartItems.length === 0 ? 
                (
                    <div className="cart-empty-text">Cart is empty</div>
                ) : (
                    cartItems.map((item)=>(
                    <div key={item.id}>
                        <Row className="cart-item" >
                            <Col 
                                sm={{span: 24}}
                                lg={{span: 8}}
                                className="cart-item-img-block"
                            >
                                <img alt="product-preview" src={item.imagePreview} className="cart-item-img" />
                            </Col>
                            <Col 
                                sm={{span: 24}}
                                lg={{span: 16}}
                                className="cart-item-info"  
                            >
                                <div className="cart-item-info-block">
                                    <div className="cart-item-block cart-item-basic-block">
                                        <div className="cart-item-name">
                                            <p className="cart-item-category">{item.category.toUpperCase()}</p>
                                            <p className="cart-item-flavor">{item.flavor.toLowerCase()}</p>
                                        </div>
                                        <Select 
                                            className="cart-item-qty-select"
                                            defaultValue={item.qty}
                                            bordered={false}
                                            onChange={
                                                (qty) => addCartItem(dispatch, item, item.flavor, item.color, item.decoration, item.message, item.price, qty)
                                            }
                                        >
                                            {[...Array(5).keys()].map((x) => (
                                                <Option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </Option>
                                            ))}
                                        </Select>
                                        <p className="cart-item-price">${item.price * item.qty}</p>
                                        <div className="cart-item-remove-btn" onClick={() => removeCartItem(dispatch, item.id)}>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    </div>
                                    <div className="cart-item-block cart-item-color-block">
                                        <p className="cart-item-title">{item.color?"Color":""}</p>
                                        <div className="cart-item-each-color">
                                            {item.color?(item.color.map((clr)=>(
                                                <div className="cart-item-color" key={clr.id} style={{backgroundColor:`${clr.color}`}} ></div>
                                            ))):<></>}
                                        </div>
                                    </div>
                                    <div className="cart-item-block cart-item-deco-block">
                                        <p className="cart-item-title">Decoration</p>
                                        <div className="cart-item-deco">
                                            {item.decoration.image?(
                                                <img alt="decoration-image" src={item.decoration.image} className="cart-item-deco-img" />
                                            ):(
                                                <p className="cart-item-deco-text">{item.decoration.text}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="cart-item-block cart-item-message-block">
                                        <p className="cart-item-title">Message</p>
                                        <p className="cart-item-message">{item.message}</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <hr className="item-line" />
                    </div>
                    ))
                )}
            </Col>
            <Col
                sm={{span: 24}}
                md={{span: 8}}
                className="cart-total"
            >
                <div className="cart-total-block">
                    <div className="cart-sub">
                        <p className="total-sub-name">Subtotal</p>
                        <p className="total-sub-text">${getTotalPrice()}</p>
                    </div>
                    <div className="cart-ship">
                        <p className="total-ship-name">Shipping</p>
                        <p className="total-ship-text">${calShippingPrice()}</p>
                    </div>
                    <hr className="cart-total-line" />
                    <div className="cart-final-total">
                        <p className="final-total-name">Total</p>
                        <p className="final-total-text">${getTotalPrice()+calShippingPrice()}</p>
                    </div>
                </div>
                <div className="cart-check-out-block">
                    <Button
                        className="check-out-btn"
                        type="primary"
                    >
                        CHECK OUT
                    </Button>
                </div>
            </Col>
        </Row>
    );

}
