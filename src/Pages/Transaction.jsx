import { Layout,} from 'antd';
import { TRANSACTION_PAGE_MENU_KEY } from '../.env';
import AppFooter from '../components/Footer';
import AppHeader from '../components/Header';
import TransactionsViewRouter from '../components/transaction/transaction-router';

const {Content} = Layout;

const TransactionPage = () => {
    return (
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