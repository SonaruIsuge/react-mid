import React, { useCallback, useState, useEffect } from "react";
import ProductItem from "./ProductItem";

export default function ProductList({ listTitle, id, products, customize }) {
//   const [listWidth, setListWidth] = useState(
//     document.getElementById(`${id}`)?.clientWidth
//   );
//   const [fullWidth, setFullWidth] = useState(
//     document.getElementById(`${id}`)?.scrollWidth
//   );
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
            calWidthDif(node.scrollWidth - node.clientWidth);
        },[])

        useEffect(()=>{
            window.addEventListener('resize',onResize);
            return (()=>{
                window.removeEventListener('resize',onResize)
            }), [document.documentElement.clientWidth]
        },[])

        return size;
    }

    let size  = ChangeSize();

    const [moveStyle, setMoveStyle] = useState({
        transform: "translate3d(0px, 0px, 0px)",
    });

    const onPrevClick = () => {
        //const root = document.documentElement;
        //root.style.setProperty('--move', '0px');
        setMoveStyle({ transform: "translate3d(0px, 0px, 0px)" });
    };

    const onNextClick = () => {
        console.log(widthDif);
        //const root = document.documentElement;
        //root.style.setProperty('--move', `-${widthDif}px`)
        setMoveStyle({ transform: `translate3d(-${widthDif}px, 0px, 0px)` });
    };

    return (
        <div className="product-list">
        <p className="product-list-title">{listTitle}</p>
        <div className="list-block" id={id}>
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
