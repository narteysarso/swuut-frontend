import AppRegisterStaffForm from "../app-register-staff-form"
import { Drawer} from 'antd';
import { useEffect, useState } from "react";
import { get, set, subscriber } from "../../../core/adapters/drawerStorage";
import { REGISTER_STAFF_DRAWER_KEY } from "../../../.env";

const AppRegisterStaffDrawer = (props) => {
    const [isVisible, setVisibility] = useState(get(REGISTER_STAFF_DRAWER_KEY, true))


    useEffect(() => {
        let unsubscribe = subscriber(REGISTER_STAFF_DRAWER_KEY, (value) => {
            setVisibility(value)
            return () => {
                unsubscribe()
            }
        })
    });

    return (
        <Drawer
            title="Staff Registration"
            placement="right"
            closable={true}
            onClose={() => set(REGISTER_STAFF_DRAWER_KEY, false)}
            maskClosable={false}
            visible={isVisible}
            getContainer={false}
            style={{ position: 'absolute' }}
            width={600}
        >
            <AppRegisterStaffForm />
        </Drawer>
    )
}

export default AppRegisterStaffDrawer