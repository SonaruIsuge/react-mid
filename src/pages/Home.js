import { useContext } from "react"; 
import { Layout } from 'antd';
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
import MainImage from "../components/MainImage";
import ProductList from "../components/ProductList";
import { StoreContext } from "../store";

const { Header, Content, Footer } = Layout;

export default function Home() {
    const { state: { page: { bestSaleGoods, recommendGoods } } } = useContext(StoreContext);

    return(
        <Layout className="container main-layout">
            <Header className="layout-header">
                <AppHeader />
            </Header>
            <Content className="layout-content">
                <MainImage />
                <ProductList listTitle="BEST SELLERS" id="bs" products={ bestSaleGoods }/>
                <ProductList listTitle="RECOMMEND" id="re" products={ recommendGoods } />
            </Content>
            <Footer className="layout-footer">
                <AppFooter />
            </Footer>
        </Layout>
    )
}