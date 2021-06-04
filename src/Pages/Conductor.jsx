import { Layout } from 'antd';
import { useState , useEffect} from 'react';
import { Redirect } from 'react-router';
import { CONDUCTOR_PAGE_MENU_KEY } from '../.env';
import ConductorsViewRouter from '../components/conductor/conductor-router';
import AppRegisterConductorDrawer from '../components/conductor/drawer/app-register-conductor-drawer';
import AppFooter from '../components/Footer';
import AppHeader from '../components/Header';
import { getLogin, subscribeToLogin } from '../core/loginSubscription';
const { Content } = Layout;

const ConductorPage = () => {
    const [registerConductorDrawerVisible, setRegisterConductorDrawerVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(getLogin(false))

    const toggleRegisterConductorDrawer = () => {
        setRegisterConductorDrawerVisible(!registerConductorDrawerVisible)
    }

    useEffect(() => {
        let unscribe = subscribeToLogin(setIsLoggedIn);

        return ()=>{
            unscribe()
        }
    });
    return (
        !isLoggedIn ? <Redirect to="/login" /> :
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