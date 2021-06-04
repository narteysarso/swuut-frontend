import { Layout } from 'antd';
import { CARDHOLDER_PAGE_MENU_KEY } from '../.env';
import CardHolderViewRouter from '../components/card-holder/card-holder-router';
import AppFooter from '../components/Footer';
import AppHeader from '../components/Header';


const { Content } = Layout;



const CardHolderPage = () => {
    return (
        <Layout className="layout">
            <AppHeader pageKey={CARDHOLDER_PAGE_MENU_KEY} />
            <Content style={CardHolderPageStyles.content}>
               <CardHolderViewRouter />
            </Content>
            <AppFooter />
        </Layout>
    )
}

const CardHolderPageStyles = {
    content: { padding: '50px 50px', minHeight: "80vh", backgroundColor: "white",  backgroundImage: `url("./images/body-background.jpg")`, backgroundSize: "cover" }
}

export default CardHolderPage