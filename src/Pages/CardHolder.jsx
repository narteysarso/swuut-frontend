import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { CARDHOLDER_PAGE_MENU_KEY } from '../.env';
import CardHolderViewRouter from '../components/card-holder/card-holder-router';
import AppFooter from '../components/Footer';
import AppHeader from '../components/Header';

import { getLogin, subscribeToLogin } from '../core/loginSubscription';

const { Content } = Layout;



const CardHolderPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(getLogin(false))

    useEffect(() => {
        let unscribe = subscribeToLogin(setIsLoggedIn);

        return ()=>{
            unscribe()
        }
    });
    return (
        !isLoggedIn ? <Redirect to="/login" /> :
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