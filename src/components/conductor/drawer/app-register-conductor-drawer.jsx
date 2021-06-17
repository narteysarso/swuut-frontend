import AppRegisterConductorForm from "../app-register-conductor-form"
import { Drawer} from 'antd';
import { useEffect, useState } from "react";
import { get, set, subscriber } from "../../../core/support/drawerStorage";
import { CONDUCTER_DRAWER_KEY } from "../../../.env";

const AppRegisterConductorDrawer = (props) => {

    const [isVisible, setVisibility] = useState(get(CONDUCTER_DRAWER_KEY, false));

    useEffect(() => {
        let unscribe = subscriber(CONDUCTER_DRAWER_KEY, (value) => {
            setVisibility(value)
            return () => {
                unscribe()
            }
        })
    });

    return (
        <Drawer
            title="Conductor Registration"
            placement="right"
            closable={true}
            onClose={() => set(CONDUCTER_DRAWER_KEY, false)}
            maskClosable={false}
            visible={isVisible}
            getContainer={false}
            style={{ position: 'absolute' }}
            width={600}
        >
            <AppRegisterConductorForm />
        </Drawer>
    )
}

export default AppRegisterConductorDrawer