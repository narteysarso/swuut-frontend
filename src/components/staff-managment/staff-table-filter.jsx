import { Button, Input, Row } from "antd";
import { useState } from "react";
import { REGISTER_STAFF_DRAWER_KEY } from "../../.env";
import { set } from "../../core/adapters/drawerStorage";
import { onSearch } from "../../core/components/staff-managment/all-staff";

const { Search } = Input;

const StaffTableFilter = (props) => {
    const [searchLoading, setSearchLoading] = useState(false)
    return (
        <Row justify="space-between" style={{...props.style}}>
            <Button onClick={() => set(REGISTER_STAFF_DRAWER_KEY, true)}>
                Add Staff
            </Button>
            <Search
                style={{ width: "30vw", marginLeft: "1vw"}}
                placeholder="Find Staff"
                onSearch={(value, event) => onSearch(value, event)}
                loading={searchLoading}
                enterButton />
        </Row>
    )
}

export default StaffTableFilter;