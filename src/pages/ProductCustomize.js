import { useContext, useEffect } from "react"; 
import { Layout} from 'antd';
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
import CustomizeDetail from "../components/CustomizeDetail"
import { StoreContext } from "../store";
import products from "../json/products.json"

const { Header, Content, Footer } = Layout;

export default function ProductCustomize({match}) {
    const product = products.find(
        x => x.id === match.params.productId
    );

    useEffect(()=>{
        console.log(product);
    },[])

    return(
        <Layout className="container main-layout">
            <Header className="layout-header">
                <AppHeader />
            </Header>
            <Content className="layout-content">
                <CustomizeDetail product={product} />
            </Content>
            <Footer className="layout-footer">
                <AppFooter />
            </Footer>
        </Layout>
    )
}