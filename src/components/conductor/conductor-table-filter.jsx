import { Button, Input, Row } from "antd";
import { useState } from "react";
import { CONDUCTER_DRAWER_KEY } from "../../.env";
import { set } from "../../core/support/drawerStorage";
import { onSearch } from "../../core/components/conductors/all-conductors";

const { Search } = Input;

const ConductorTableFilter = (props) => {
    const [searchLoading, setSearchLoading] = useState(false);
    
    return (
        <Row justify="space-between" style={{...props.style}}>
            <Button onClick={() => set(CONDUCTER_DRAWER_KEY, true)}>
                Add Conductor
            </Button>
            <Search
                style={{ width: "30vw", marginLeft: "1vw"}}
                placeholder="Find Conductor"
                onSearch={(value, event) => onSearch(value, event)}
                loading={searchLoading}
                enterButton />
        </Row>
    )
}

export default ConductorTableFilter