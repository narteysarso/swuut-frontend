import { Layout, Image, Button } from 'antd';
import {  useState } from 'react';
import { STAFFMANAGMENT_PAGE_MENU_KEY } from '../.env';
import AppFooter from '../components/Footer';
import AppHeader from '../components/Header';
import AppRegisterStaffDrawer from '../components/staff-managment/drawer/app-register-staff-drawer';
import StaffManagmentsViewRouter from '../components/staff-managment/staff-managment-router';


const {Content} = Layout;

const StaffManagmentPage = ()=> {
    const [registerStaffDrawerVisible, setRegisterStaffDrawerVisible] = useState(false);

    const toggleRegisterStaffDrawer = () => {
        setRegisterStaffDrawerVisible(!registerStaffDrawerVisible)
    }
    return (
        <Layout className="layout">
            <AppHeader pageKey={STAFFMANAGMENT_PAGE_MENU_KEY} />
            <Content style={StaffManagmentPageStyles.content}>
            <AppRegisterStaffDrawer visible={registerStaffDrawerVisible} onClose={toggleRegisterStaffDrawer} />
               <StaffManagmentsViewRouter />
            </Content>
            <AppFooter />
        </Layout>
    )
}

const StaffManagmentPageStyles = {
    content: { position: "relative", overflowX:"hidden", padding: '50px 50px', minHeight: "80vh", backgroundColor: "white", backgroundImage: `url("./images/body-background.jpg")`, backgroundSize: "cover"  }
}

export default StaffManagmentPage;