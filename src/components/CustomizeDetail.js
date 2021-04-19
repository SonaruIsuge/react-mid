import { Col, Row, Button, Input, Select } from "antd";
import { useState, useEffect, useContext } from "react";
import { StoreContext } from "../store";
import { addCartItem, openNotification } from "../actions";
import cakeBg from "../images/cake-background.png";

const { TextArea } = Input;
const { Option } = Select;

export default function CustomizeDetail({ product }) {
    const { state: { customize: { customizeColor, customizeDecoration }, cartItems }, dispatch } = useContext(StoreContext);

    const [isMultipleColor, setIsMultipleColor] = useState(false);
    const [chooseColor, setChooseColor] = useState([customizeColor[0]]);
    const [chooseDeco, setChooseDeco] = useState((customizeDecoration.filter(x => x.category === product.category))[0]);
    const [chooseDecoInfo, setChooseDecoInfo] = useState(product.category==="browine"?customizeColor[0]:null);
    const [message, setMessage] = useState("");
    const [qty, setQty] = useState(1);
    const [totalPrice, calTotalPrice] = useState(product.price);
    const [warnText, setWarnText] = useState("");

    // const [fileList, setFileList] = useState({});

    const isMultiColorClick = () => {
        setIsMultipleColor(true);
    }

    const isSingleColorClick = () => {
        const choose = chooseColor;
        if (choose.length > 0) choose.shift();
        setChooseColor(choose);
        setIsMultipleColor(false);
    }
    // 選顏色
    const onColorClick = (color) => {
        // 一種
        if (!isMultipleColor) {
            setChooseColor([color]);
        }
        //兩種
        else {
            const choose = chooseColor;
            //處理: 選取已經選取的值
            if ([...choose].includes(color)) {
                choose.splice(choose.indexOf(color), 1);
            }
            //處理: 已經選取兩項
            if (choose.length > 1) {
                choose.shift();
            }
            choose.push(color);
            setChooseColor([...choose]);
        }
    }
    // 選裝飾
    const onDecoClick = (deco) => {
        setChooseDeco(deco);
    }

    // 裝飾 -> Color/Image = decoInfo
    const onDecoInfoClick = (decoInfo) => {
        setChooseDecoInfo(decoInfo);
    }

    // 計算總價
    useEffect(() => {
        const price = product.price +
            (isMultipleColor ? 20 : 0) +
            (chooseDeco.price)
        calTotalPrice(price)
    }, [product.price, isMultipleColor, chooseDeco.price])

    const addToCart = () => {
        if(product.category === "cake" && isMultipleColor && chooseColor.length < 2)
            setWarnText("Please Choose Two Colors");
        else if (product.category === "cake" && !isMultipleColor && chooseColor.length < 1)
            setWarnText("Please Choose One Color");
        else if (product.category === "browine" && chooseDeco.text === "COLOR" && !chooseDecoInfo.color)
            setWarnText("Please Choose One Color");
        else if (product.category === "browine" && chooseDeco.text === "IMAGE" && !chooseDecoInfo[0])
            setWarnText("Please Upload One Image");
        
        else {
            setWarnText("");
            openNotification();
            addCartItem(
                dispatch, 
                product, 
                product.flavor[0], 
                product.category === "cake" ? chooseColor : null, 
                chooseDeco, 
                chooseDecoInfo, 
                message, 
                totalPrice, 
                qty
            );
        }
    }

    //Preview顏色顯示
    const setCakeStyle = () => {
        if (product.category === "cake") {
            return ({
                backgroundImage: `url(${cakeBg}), 
                linear-gradient(${chooseColor[0] ? chooseColor[0].color : "#FFFFFF"}, ${chooseColor[1] ? chooseColor[1].color : (chooseColor[0] ? chooseColor[0].color : "#FFFFFF")}`
            })
        }
        else return ({})
    }

    // LocalSortage
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems])

    // Color Debug
    useEffect(() => { console.log(chooseColor); }, [chooseColor])
    // Decoration Debug
    useEffect(() => { console.log(chooseDeco); }, [chooseDeco])
    // Message Debug
    useEffect(() => { console.log(message) }, [message])
    // Total Price Debug
    useEffect(() => { console.log(totalPrice); }, [totalPrice])
    // cartItem Deebug
    useEffect(() => { console.log(cartItems); }, [cartItems])
    // decoInfo Debug
    useEffect(()=>{ console.log(chooseDecoInfo); }, [chooseDecoInfo])

    // 預覽圖片
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = (e) => {
                document.getElementById("blah").src = e.target.result;
            }
            reader.readAsDataURL(input.files[0]); // convert to base64 string
        }
    }

    // add decoChoose when category is browine
    function addBrowineDecoChoose(){
        if(product.category !== "browine") 
            return null;
        return(chooseDeco.text === "COLOR"?(
            <Row className="choose-color">
                {customizeColor.map((color) => (
                    <Col
                        key={`${color.id}`}
                        className="each-color"
                        sm={{ span: 6 }}
                        md={{ span: 3 }}
                    >
                        <Button
                            className={`choose-color-btn ${[chooseDecoInfo].includes(color) ? "choose-color-btn--choose" : "not-choose"}`}
                            id={`browine-${color.id}`}
                            style={{ backgroundColor: `${color.color}` }}
                            type="default"
                            onClick={() => onDecoInfoClick(color)}
                        >
                            <p></p>
                        </Button>
                    </Col>
                ))}
            </Row>
        ):(
            <div className="deco-input">
                <label className="deco-input-label">
                    <input 
                        type="file" 
                        className="deco-upload" 
                        name="file" 
                        id="input" 
                        onChange={(val)=>{setChooseDecoInfo(val.target.files); readURL(val.target)}}
                    />
                    <p>{chooseDecoInfo[0]? chooseDecoInfo[0].name :"UPLOAD IMAGE"}</p>
                </label>
                <img id="blah" src="#" alt="" className="deco-upload-preview"/>
            </div>
        ))
    }

    return (
        <Row className="customize">
            <Col
                sm={{ span: 24 }}
                md={{ span: 8, offset: 1 }}
                className="customize-preview"
            >
                <p className="customize-preview-title">PREVIEW</p>
                <img alt="product" src={product.imagePreview} className="preview-cake-img" style={setCakeStyle()} />
                <img alt="decoration"
                    src={chooseDeco.imagePreview} className="deco-preview-img" />
            </Col>
            <Col
                sm={{ span: 24 }}
                md={{ span: 15 }}
                className="customize-options"
            >
                <p className="customize-options-title">{product.flavor}</p>
                <ul className="options-block">
                    {product.color1 ? (
                        <li className="option customize-color">
                            <p className="option-title">COLOR</p>
                            <div className="option-choose">
                                <Button
                                    className={`option-btn color-btn mul-color-btn ${isMultipleColor ? "btn--choose" : ""}`}
                                    onClick={isMultiColorClick}
                                    type="primary"
                                >
                                    <p className="option-btn-text">MIX</p>
                                    <p className="addition-text">+20</p>
                                </Button>
                                <Button
                                    className={`option-btn color-btn sin-color-btn ${isMultipleColor ? "" : "btn--choose"}`}
                                    onClick={isSingleColorClick}
                                    type="primary"
                                >
                                    <p className="option-btn-text">SINGLE</p>
                                </Button>
                            </div>
                            <p className="choose-color-hint">Choose {isMultipleColor ? "two colors" : "one color"}</p>
                            <Row className="choose-color">
                                {customizeColor.map((color) => (
                                    <Col
                                        key={`${color.id}`}
                                        className="each-color"
                                        sm={{ span: 6 }}
                                        md={{ span: 3 }}
                                    >
                                        <Button
                                            className={`choose-color-btn ${[...chooseColor].includes(color) ? "choose-color-btn--choose" : "not-choose"}`}
                                            id={color.id}
                                            style={{ backgroundColor: `${color.color}` }}
                                            type="default"
                                            onClick={() => onColorClick(color)}
                                        >
                                            <p></p>
                                        </Button>
                                    </Col>
                                ))}
                            </Row>
                        </li>
                    ) : (<></>)}
                    <li className="option customize-deco">
                        <p className="option-title">DECORATION</p>
                        <Row className="option-choose">
                            {(customizeDecoration.filter(x => x.category === product.category)).map((deco) => (
                                <Col
                                    key={deco.id}
                                    className="each-deco"
                                    md={{ span: 12 }}
                                    lg={{ span: 6 }}
                                >
                                    <Button
                                        className={`option-btn deco-btn ${chooseDeco === deco ? "choose-color-btn--choose" : ""}`}
                                        onClick={() => onDecoClick(deco)}
                                    >
                                        {deco.text ? (
                                            <>
                                                <p className="option-btn-text deco-text">{deco.text}</p>
                                                <p className="addition-text deco-addition-text">+{deco.price}</p>
                                            </>
                                        ) : (
                                            <img alt="deco" src={deco.image} className="deco-img" />
                                        )}
                                    </Button>
                                </Col>
                            ))}
                        </Row>
                        {addBrowineDecoChoose()}
                    </li>
                    <li className="option customize-message">
                        <p className="option-title">MESSAGE</p>
                        <div className="option-choose choose-last">
                            <div className="message-block">
                                <TextArea
                                    className="choose-message"
                                    maxLength={20}
                                    showCount
                                    bordered={false}
                                    autoSize={{ minRows: 4, maxRows: 6 }}
                                    placeholder="HAPPY BIRTHDAY"
                                    allowClear={true}
                                    size="large"
                                    onChange={(t) => setMessage(t.target.value)}
                                ></TextArea>
                            </div>
                            <div className="total-price-block">
                                <div className="product-qty">
                                    <p>Qty </p>
                                    <Select
                                        className="qty-select"
                                        defaultValue={1}
                                        bordered={false}
                                        onChange={val => setQty(val)}
                                    >
                                        {[...Array(5).keys()].map((x) => (
                                            <Option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </Option>
                                        ))}
                                    </Select>

                                </div>
                                <div className="total-price">
                                    <p className="total-rice-text">${totalPrice * qty}</p>
                                </div>
                            </div>
                            <div className="add-to-cart-block">
                                <Button
                                    className="add-to-cart-btn"
                                    type="primary"
                                    onClick={addToCart}
                                >
                                    ADD TO CART
                                </Button>
                                <p className="warn-text">{warnText}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </Col>
        </Row>
    );
}