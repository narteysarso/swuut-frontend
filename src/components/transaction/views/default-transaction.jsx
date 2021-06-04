import { Button } from "antd";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import transactionAnimation from "../../../lottie-animation/transaction-animation.json";

const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: transactionAnimation,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};
const TransactionDefault = () => {
    
    return (
        <div className="site-layout-content" style={{ textAlign: 'center' }}>

            <Lottie options={defaultOptions}
                width="26vw" />
            <h3>Awaiting transactions <Link to="transactions/all"><Button type="primary">Get Started</Button></Link></h3>
        </div>
    )
}

export default TransactionDefault;