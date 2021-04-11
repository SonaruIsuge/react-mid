import { Link } from "react-router-dom";
import React, { useCallback, useState, useEffect } from "react";
import ProductItem from "./ProductItem";

export default function ProductList({listTitle, id ,products}) {
    const [listWidth, setListWidth] = useState(document.getElementById(`${id}`)?.clientWidth);
    const [fullWidth, setFullWidth] = useState(document.getElementById(`${id}`)?.scrollWidth);
    const [widthDif, calWidthDif] = useState(fullWidth-listWidth);
    
    // 監聽視窗大小變化
    function ChangeSize(){
        const [size, setSize] = useState({
                width:document.documentElement.clientWidth,
                hieght:document.documentElement.clientHeight
        })
    
        const onResize = useCallback(()=>{
            setSize({
                width:document.documentElement.clientWidth,
                height:document.documentElement.clientHeight,
            })
        },[])
    
        useEffect(()=>{
            window.addEventListener('resize',onResize);
            return (()=>{
                window.removeEventListener('resize',onResize)
            })
        },[])
    
        return size;
    }

    let size  = ChangeSize();

    //獲取list寬度和全長，取得兩者寬度差
    useEffect(() => {
        // const root = document.documentElement;
        // root.style.setProperty('--move', '0px');
        

        let node = document.getElementById(`${id}`);
        if (node !== null) {
            setListWidth(node.clientWidth);
            console.log(listTitle + " list: " + listWidth); 

            setFullWidth(node.scrollWidth);
            console.log(listTitle + " full: " + fullWidth);

            calWidthDif(fullWidth-listWidth);
            console.log(listTitle + " Dif: " + widthDif);
            }
        }
    );

    const [moveStyle, setMoveStyle] = useState({transform: "translate3d(0px, 0px, 0px)",})


    const onPrevClick = () => {
        //const root = document.documentElement;
        //root.style.setProperty('--move', '0px');
        setMoveStyle({transform: "translate3d(0px, 0px, 0px)",});
    }

    const onNextClick = () => {
        console.log(widthDif)
        //const root = document.documentElement;
        //root.style.setProperty('--move', `-${widthDif}px`)
        setMoveStyle({transform: `translate3d(-${widthDif}px, 0px, 0px)`,});
    }

    return (
        <div className="product-list">
            <p className="product-list-title">{listTitle}</p>
            <div className="list-block" id={id}>
                <div className={`slick-prev slick-arrow ${listWidth < fullWidth ? "slick--show" : "slick--hide"}`} onClick={onPrevClick}>
                    <div></div>
                    <div></div>
                </div>
                {products.map(product => (
                    <ProductItem listWidth={listWidth} fullWidth={fullWidth} product={product} key={product.id} moveStyle={moveStyle}/>
                ))}
                <div className={`slick-next slick-arrow ${listWidth < fullWidth ? "slick--show" : "slick--hide"}`} onClick={onNextClick}>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}