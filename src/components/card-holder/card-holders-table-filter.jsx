import { Radio,DatePicker, Input, Row } from "antd";
import { useState } from "react";
import { handleDateChange, onSearch } from "../../core/components/card-holders/all-card-holders";

const {RangePicker} = DatePicker;
const {Search} = Input;

const CardHolderTableFilter = () => {
    const [dateFilterValue, setDateFilterValue] = useState("all")
    const [searchLoading, setSearchLoading] = useState(false)
    return (
        <Row justify="flex-end">

            <Search
                style={{ width: "27vw", marginLeft: "1vw" }}
                placeholder="Find Transaction"
                onSearch={(value, event) => onSearch(value, event)}
                loading={searchLoading}
                enterButton />
        </Row>
    )
}

export default CardHolderTableFilter