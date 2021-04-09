import { useContext } from "react"; 
import { Layout } from 'antd';
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
import MainImage from "../components/MainImage";
import BestSeller from "../components/BestSeller";
import { StoreContext } from "../store";

const { Header, Content, Footer } = Layout;

export default function Home() {
    const { state: { page: { bestSaleGoods } } } = useContext(StoreContext);

    return(
        <Layout className="container main-layout">
            <Header className="layout-header">
                <AppHeader />
            </Header>
            <Content className="layout-content">
                <MainImage />
                <BestSeller bestSellGoods={ bestSaleGoods }/>
            </Content>
            <Footer className="layout-footer">
                <AppFooter />
            </Footer>
        </Layout>
    )
}