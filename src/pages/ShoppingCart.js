import { useContext } from "react";
import { Layout } from "antd";
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
import CartDetail from "../components/CartDetail"
import { StoreContext } from "../store";

const { Header, Content, Footer } = Layout;

export default function ShoppingCart() {
    return (
        <Layout className="container main-layout">
            <Header className="layout-header">
                <AppHeader />
            </Header>
            <Content className="layout-content">
                <CartDetail />
            </Content>
            <Footer className="layout-footer">
                <AppFooter />
            </Footer>
        </Layout>
    );
}