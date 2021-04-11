import { Link } from "react-router-dom";
import React, { useCallback, useState, useEffect } from "react";

export default function BestSeller({bestSellGoods}) {
    const [listWidth, setListWidth] = useState(document.getElementById("bestSellerList")?.clientWidth);
    const [fullWidth, setFullWidth] = useState(document.getElementById("bestSellerList")?.scrollWidth);
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
        const root = document.documentElement;
        root.style.setProperty('--move', '0px');

        let node = document.getElementById("bestSellerList");
        if (node !== null) {
            setListWidth(node.clientWidth);
            console.log("list: " + listWidth); 

            setFullWidth(node.scrollWidth);
            console.log("full: " + fullWidth);

            calWidthDif(fullWidth-listWidth);
            console.log("Dif: " + widthDif);
            }
        }
    );
    
    const onPrevClick = () => {
        const root = document.documentElement;
        root.style.setProperty('--move', '0px');
    }

    const onNextClick = () => {
        console.log(widthDif)
        const root = document.documentElement;
        root.style.setProperty('--move', `-${widthDif}px`)
    }

    return (
        <div className="best-seller">
            <p className="best-seller-title">BEST SELLERS</p>
            <div className="best-seller-list" id="bestSellerList">
                <div className={`slick-prev slick-arrow ${listWidth < fullWidth ? "slick--show" : "slick--hide"}`} onClick={onPrevClick}>
                    <div></div>
                    <div></div>
                </div>
                {bestSellGoods.map(product => (
                    <div className={`best-product ${listWidth < fullWidth ? "moveable" : ""}`} key={product.id}>
                        <Link to="###" className="best-product-link">
                            <img alt={product.category} className="best-product-img" src={(product.image)} />
                        </Link>
                        <hr className="best-product-line" />
                        <p className="best-product-category">
                            {product.category.toUpperCase()}
                        </p>
                        <p className="best-product-flavor">
                            {product.flavor}
                        </p>
                        <p className="best-product-price">
                            ${product.price}
                        </p>
                    </div>
                ))}
                <div className={`slick-next slick-arrow ${listWidth < fullWidth ? "slick--show" : "slick--hide"}`} onClick={onNextClick}>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}