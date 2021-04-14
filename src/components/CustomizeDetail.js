import { Col, Row, Button } from "antd";
import { useState, useEffect, useContext } from "react";
import { StoreContext } from "../store";
import cake from "../images/home-cake.png";

export default function CustomizeDetail({product}) {
    const { state: {customize: { customizeColor, customizeDecoration } } } = useContext(StoreContext);

    const [isMultipleColor, setIsMultipleColor] = useState(false);
    const [chooseColor, setChooseColor] = useState([]);

    const isMultiColorClick = () => {
        setIsMultipleColor(true);
    }

    const isSingleColorClick = () => {
        const choose = chooseColor;
        if(choose.length > 0) choose.shift();
        setChooseColor(choose);
        setIsMultipleColor(false);
    }

    const onColorClick = (color) => {
        // 一種口味
        if(!isMultipleColor) {
            setChooseColor([color]);
        }
        //兩種口味
        else {
            const choose = chooseColor;
            //處理: 選取已經選取的值
            if([...choose].includes(color)) {
                choose.splice(choose.indexOf(color), 1);
            }
            //處理: 已經選取兩項
            if(choose.length > 1) {
                choose.shift();
            }
            choose.push(color);
            setChooseColor([...choose]);
        }
    }

    useEffect(()=> {
        console.log(chooseColor);
    }, [chooseColor])

    return (
        <Row className="customize">
            <Col
                sm={{span: 24}}
                md={{span: 8, offset: 1}}
                className="customize-preview"
            >
                <p className="customize-preview-title">PREVIEW</p> 
                <img alt="product" src={cake} className="preview-cake-img" />
            </Col>
            <Col
                sm={{span: 24}}
                md={{span: 15}}
                className="customize-options"
            >
                <p className="customize-options-title">{product.flavor}</p>
                <ul className="options-block">
                    <li className="option customize-color">
                        <p className="option-title">COLOR</p>
                        <div className="option-choose">
                            <Button 
                                className={`option-btn color-btn mul-color-btn ${isMultipleColor?"btn--choose":""}`}
                                onClick={isMultiColorClick}
                                type="primary"
                            >
                                <p className="option-btn-text">MIX</p>
                                <p className="addition-text">+20</p>
                            </Button>
                            <Button
                                className={`option-btn color-btn sin-color-btn ${isMultipleColor?"":"btn--choose"}`}
                                onClick={isSingleColorClick}
                                type="primary"
                            >
                                <p className="option-btn-text">SINGLE</p>
                            </Button>
                        </div>
                        <p className="choose-color-hint">Choose {isMultipleColor? "two colors":"one color"}</p>
                        <Row className="choose-color">
                            {customizeColor.map((color) => (
                                <Col 
                                    key={`${color.id}`}
                                    className="each-color"
                                    sm={{span: 6}}
                                    md={{span: 3}}
                                >
                                    <Button
                                        className={`choose-color-btn ${[...chooseColor].includes(color)?"choose-color-btn--choose":"not-choose"}`}
                                        id={color.id}
                                        style={{backgroundColor:`${color.color}`}}
                                        type="default"
                                        onClick={()=>onColorClick(color)}
                                    >
                                        <p></p>
                                    </Button>
                                </Col>
                            ))}
                        </Row>
                    </li>
                    <li className="option customize-deco">
                        <p className="option-title">DECORATION</p>
                        <div className="option-choose">
                            
                        </div>
                    </li>
                    <li className="option customize-message">
                        <p className="option-title">MESSAGE</p>
                        <div className="option-choose">
                            
                        </div>
                    </li>
                </ul>
            </Col> 
        </Row>
    );
}