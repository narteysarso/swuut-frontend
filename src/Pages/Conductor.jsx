import { Layout } from 'antd';
import { useState } from 'react';
import { CONDUCTOR_PAGE_MENU_KEY } from '../.env';
import ConductorsViewRouter from '../components/conductor/conductor-router';
import AppRegisterConductorDrawer from '../components/conductor/drawer/app-register-conductor-drawer';
import AppFooter from '../components/Footer';
import AppHeader from '../components/Header';

const { Content } = Layout;

const ConductorPage = () => {
    const [registerConductorDrawerVisible, setRegisterConductorDrawerVisible] = useState(false);

    const toggleRegisterConductorDrawer = () => {
        setRegisterConductorDrawerVisible(!registerConductorDrawerVisible)
    }

    return (
        <Layout className="layout">
            <AppHeader pageKey={CONDUCTOR_PAGE_MENU_KEY} />
            <Content style={ConductorPageStyles.content}>
            <AppRegisterConductorDrawer visible={registerConductorDrawerVisible} onClose={toggleRegisterConductorDrawer} />
                <ConductorsViewRouter />
            </Content>
            <AppFooter />
        </Layout>
    )
}

const ConductorPageStyles = {
    content: { position: "relative", overflowX:"hidden", padding: '50px 50px', minHeight: "80vh", backgroundColor: "white",  backgroundImage: `url("./images/body-background.jpg")`, backgroundSize: "cover" }
}


export default ConductorPage;