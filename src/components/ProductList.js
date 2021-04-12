import React, { useCallback, useState, useEffect } from "react";
import ProductItem from "./ProductItem";

let isMove = false
export default function ProductList({ listTitle, id, products, customize, deco }) {
    const [widthDif, calWidthDif] = useState(
        document.getElementById(`${id}`)?.scrollWidth -
        document.getElementById(`${id}`)?.clientWidth
    );
    //初始化widthDif
    useEffect(()=>{        
        let node = document.getElementById(`${id}`);
        calWidthDif(node.scrollWidth - node.clientWidth);
    },[])

    //監聽視窗大小變化
    function ChangeSize(){
        const [size, setSize] = useState({
            width:document.documentElement.clientWidth,
            hieght:document.documentElement.clientHeight,
        })

        const onResize = useCallback(()=>{
            setSize({
                width:document.documentElement.clientWidth,
                height:document.documentElement.clientHeight,
            })
            //在此計算widthDif
            let node = document.getElementById(`${id}`);
            if(node){
                let old = 0
                if(isMove){
                    old = widthDif
                    console.log(isMove + " " + widthDif + " " + old)
                }
                calWidthDif(node.scrollWidth + old - node.clientWidth);
            }
                
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

    const [moveStyle, setMoveStyle] = useState({
        transform: "translate3d(0px, 0px, 0px)",
    });

    const onPrevClick = () => {
        isMove = false
        setMoveStyle({ transform: "translate3d(0px, 0px, 0px)" });
    };

    const onNextClick = () => {
        isMove = true
        console.log("MOVE TO TRUE")
        setMoveStyle({ transform: `translate3d(-${widthDif}px, 0px, 0px)` });
    };

    return (
        <div className="product-list">
            <div className="product-title-block">
                <img src={deco} alt="deco" className={`list-deco ${deco?"":"list-deco--hide"}`}></img>
                <p className="product-list-title">{listTitle}</p>
            </div>
            <div className={`list-block ${listTitle.replace(" ","_")}`} id={id}>
                <div
                className={`slick-prev slick-arrow ${
                    widthDif > 0 ? "slick--show" : "slick--hide"
                }`}
                onClick={onPrevClick}
                >
                <div></div>
                <div></div>
                </div>
                {products.map((product) => (
                <ProductItem
                    widthDif={widthDif} 
                    product={product} 
                    key={product.id} 
                    moveStyle={moveStyle}
                    customize={customize}
                />
                ))}
                <div
                className={`slick-next slick-arrow ${
                    widthDif > 0 ? "slick--show" : "slick--hide"
                }`}
                onClick={onNextClick}
                >
                <div></div>
                <div></div>
                </div>
            </div>
        </div>
    );
}
