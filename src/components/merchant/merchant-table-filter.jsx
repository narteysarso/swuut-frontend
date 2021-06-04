import { Button, Input, Row } from "antd";
import { useState } from "react";
import { MERCHANT_DRAWER_KEY } from "../../.env";
import { set } from "../../core/adapters/drawerStorage";
import { onSearch } from "../../core/components/merchants/all-merchants";

const { Search } = Input;

const MerchantTableFilter = (props) => {
    const [searchLoading, setSearchLoading] = useState(false)
    return (
        <Row justify="space-between" style={{...props.style}}>
            <Button onClick={() => set(MERCHANT_DRAWER_KEY, true)}>
                Add Merchant
            </Button>
            <Search
                style={{ width: "30vw", marginLeft: "1vw"}}
                placeholder="Find Merchant"
                onSearch={(value, event) => onSearch(value, event)}
                loading={searchLoading}
                enterButton />
        </Row>
    )
}

export default MerchantTableFilter;