import AppRegisterMerchantForm from "../app-register-merchant-form"
import { Drawer} from 'antd';
import { useEffect, useState } from "react";
import { get, set, subscriber } from "../../../core/adapters/drawerStorage";
import { MERCHANT_DRAWER_KEY } from "../../../.env";

const AppRegisterMerchantDrawer = (props) => {
    const [isVisible, setVisibility] = useState(get(MERCHANT_DRAWER_KEY, false))

    useEffect(() => {
        let unscribe = subscriber(MERCHANT_DRAWER_KEY, (value) => {
            setVisibility(value);
            return () => {
                unscribe()
            }
        })
    });


    return (
        <Drawer
            title="Merchant Registration"
            placement="right"
            closable={true}
            onClose={() => set(MERCHANT_DRAWER_KEY, false)}
            maskClosable={false}
            visible={isVisible}
            getContainer={false}
            style={{ position: 'absolute' }}
            width={600}
        >
            <AppRegisterMerchantForm />
        </Drawer>
    )
}

export default AppRegisterMerchantDrawer