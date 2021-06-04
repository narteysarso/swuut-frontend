import { Button } from "antd";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import cardAnimation from "../../../lottie-animation/card-animation.json";

const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: cardAnimation,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};
const CardHolderDefault = () => {
    
    return (
        <div className="site-layout-content" style={{ textAlign: 'center' }}>
        <Lottie options={defaultOptions}
                
                width="30vw" />
           
            <h3>No <b>Card holders</b> registered <Link to="cardHolders/all"><Button type="primary">Get Started</Button></Link></h3>
        </div>
    )
}

export default CardHolderDefault;