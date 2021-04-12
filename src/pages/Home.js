import { useContext, useEffect } from "react"; 
import { Layout } from 'antd';
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
import MainImage from "../components/MainImage";
import ProductList from "../components/ProductList";
import { StoreContext } from "../store";
import { setActiveNavItem } from "../actions"

const { Header, Content, Footer } = Layout;

export default function Home() {
    const { state: { page: { bestSaleGoods, recommendGoods } }, dispatch } = useContext(StoreContext);

    useEffect(() => {
        setActiveNavItem(dispatch, "/home");
    },[])

    return(
        <Layout className="container main-layout">
            <Header className="layout-header">
                <AppHeader />
            </Header>
            <Content className="layout-content">
                <MainImage />
                <ProductList listTitle="BEST SELLERS" id="bs" products={ bestSaleGoods } customize={true}/>
                <ProductList listTitle="RECOMMEND" id="re" products={ recommendGoods } customize={false}/>
            </Content>
            <Footer className="layout-footer">
                <AppFooter />
            </Footer>
        </Layout>
    )
}