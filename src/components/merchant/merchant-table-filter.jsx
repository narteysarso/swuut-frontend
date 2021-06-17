import { Button, Input, Row } from "antd";
import { useState } from "react";
import { MERCHANT_DRAWER_KEY } from "../../.env";
import { set } from "../../core/support/drawerStorage";

const { Search } = Input;
var timer = null;
const DELAY_DURATION = 1000 * 0.35;

const MerchantTableFilter = (props) => {
    const [searchLoading, ] = useState(false)

    const handleSearch = (value) => {
        props.onSearch(value)
        
    }

    const onChange = (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            props.onSearch(e.target.value)
        }, DELAY_DURATION)
    }

    return (
        <Row justify="space-between" style={{...props.style}}>
            <Button onClick={() => set(MERCHANT_DRAWER_KEY, true)}>
                Add Merchant
            </Button>
            <Search
                style={{ width: "30vw", marginLeft: "1vw"}}
                placeholder="Find Merchant"
                onSearch={(value, event) => handleSearch(value)}
                loading={searchLoading}
                onChange={onChange}
                enterButton />
        </Row>
    )
}

export default MerchantTableFilter;