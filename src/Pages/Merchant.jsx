import { Layout} from 'antd';
import { useState } from 'react';
import { MERCHANT_PAGE_MENU_KEY } from '../.env';
import AppFooter from '../components/Footer';
import AppHeader from '../components/Header';
import AppRegisterMerchantDrawer from '../components/merchant/drawer/app-register-merchant-drawer';
import MerchantsViewRouter from '../components/merchant/merchant-router';

const { Content, } = Layout;


const MerchantPage = () => {
    const [registerMerchantDrawerVisible, setRegisterMerchantDrawerVisible] = useState(false)
    const toggleRegisterMerchantDrawer = () => {
        setRegisterMerchantDrawerVisible(!registerMerchantDrawerVisible)
    }
    return (
        <Layout className="layout">
            <AppHeader pageKey={MERCHANT_PAGE_MENU_KEY} />
            <Content style={MerchantPageStyles.content}>
                <AppRegisterMerchantDrawer visible={registerMerchantDrawerVisible}  onClose={toggleRegisterMerchantDrawer}/>
                <MerchantsViewRouter />
            </Content>
            <AppFooter />
        </Layout>
    )
}

const MerchantPageStyles = {
    content: { position: "relative", overflowX: "hidden", padding: '50px 50px', minHeight: "80vh", backgroundColor: "white", backgroundImage: `url("./images/body-background.jpg")`, backgroundSize: "cover" }
}


export default MerchantPage;