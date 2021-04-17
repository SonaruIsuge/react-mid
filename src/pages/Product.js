import { useContext, useEffect } from "react"; 
import { Layout } from 'antd';
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
import ProductList from "../components/ProductList"
import { StoreContext } from "../store";
import { setActiveNavItem } from "../actions";
import Deco from "../images/deco-01.png";

const { Header, Content, Footer } = Layout;

export default function Product() {
    const { state: { page: { productCake, productTart, productBrownie } }, dispatch } = useContext(StoreContext);
    useEffect(() => {
        setActiveNavItem(dispatch, "/product");
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
    return(
        <Layout className="container main-layout">
            <Header className="layout-header">
                <AppHeader />
            </Header>
            <Content className="layout-content">
                <p className="product-page-title">CHOOSE A FLAVOR</p> 
                <ProductList listTitle="CAKE" id="ck" products={productCake} customize={true} deco={Deco} />
                <ProductList listTitle="TART" id="tr" products={productTart} customize={true} deco={Deco} />
                <ProductList listTitle="BROWNIE" id="bn" products={productBrownie} customize={true} deco={Deco} />
            </Content>
            <Footer className="layout-footer">
                <AppFooter />
            </Footer>
        </Layout>
    )
}