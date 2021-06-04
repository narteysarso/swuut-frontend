import { Breadcrumb } from "antd"
import { Link } from "react-router-dom";

const onChange = (event) => {
    alert(event.target.value);
}

const TransactionSubMenu = () => {
    return (
        <Breadcrumb separator="">
            <Breadcrumb.Item>
                <Link to="/transactions/all">
                    All
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>|</Breadcrumb.Separator>
            <Breadcrumb.Item>
                <Link to="/transactions/cards">
                    Cards
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>|</Breadcrumb.Separator>
            <Breadcrumb.Item>
                <Link to="/transactions/conductors">
                    Conductors
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>|</Breadcrumb.Separator>
            <Breadcrumb.Item>
                <Link to="/transactions/merchants">
                    Merchants
                </Link>
            </Breadcrumb.Item>
            
        </Breadcrumb>
    )
}

export default TransactionSubMenu