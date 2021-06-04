import { Layout,} from 'antd';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { TRANSACTION_PAGE_MENU_KEY } from '../.env';
import AppFooter from '../components/Footer';
import AppHeader from '../components/Header';
import TransactionsViewRouter from '../components/transaction/transaction-router';
import { getLogin, subscribeToLogin } from '../core/loginSubscription';

const {Content} = Layout;

const TransactionPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(getLogin(false))

    useEffect(() => {
        let unscribe = subscribeToLogin(setIsLoggedIn);

        return ()=>{
            unscribe()
        }
    });
    return (

        !isLoggedIn ? <Redirect to="/login" /> :
        <Layout className="layout" >
            <AppHeader pageKey={TRANSACTION_PAGE_MENU_KEY} />
            <Content  style={TransactionPageStyles.content}>
               

                <TransactionsViewRouter />
                
            </Content>
            <AppFooter />
        </Layout>
    )
}

const TransactionPageStyles = {
    content: {  padding: '50px 50px', minHeight: "80vh", backgroundColor: "white", backgroundImage: `url("/images/body-background.jpg")`, backgroundSize: "cover" }
}
export default TransactionPage