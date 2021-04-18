import { Layout, Empty } from "antd";
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";

const { Header, Content, Footer } = Layout;

export default function AboutUs() {
    return (
        <Layout className="container main-layout">
            <Header className="layout-header">
                <AppHeader />
            </Header>
            <Content className="layout-content">
                <Empty />
            </Content>
            <Footer className="layout-footer">
                <AppFooter />
            </Footer>
        </Layout>
    );
}