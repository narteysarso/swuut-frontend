import { Button } from "antd"
import Lottie from "react-lottie"
import { Link } from "react-router-dom";

import userRegisterAnimation from "../../../lottie-animation/users_register.json";

const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: userRegisterAnimation,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};
const DefaultConductor = () => {
    return (
        <div>
            
            <div className="site-layout-content" style={{ textAlign: 'center' }}>
                <Lottie options={defaultOptions}
                    width="26vw" />

                <h3>Add a <b>Conductor</b> to start</h3>
                <Link to="/conductors/all">
                    <Button size="large" type="primary" >Get Started</Button>
                </Link>
            </div>
        </div>
    )
}

export default DefaultConductor