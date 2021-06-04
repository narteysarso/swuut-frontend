import { Radio,DatePicker, Input, Row } from "antd";
import { useState } from "react";
import { handleDateChange, onSearch } from "../../core/components/transactions/all-transactions";

const {RangePicker} = DatePicker;
const {Search} = Input;

const TransactionTableFilter = () => {
    const [dateFilterValue, setDateFilterValue] = useState("all")
    const [searchLoading, setSearchLoading] = useState(false)
    return (
        <Row justify="space-between">
        
            <Radio.Group
                options={[
                    { label: 'Today', value: 'today' },
                    { label: 'Week', value: 'week' },
                    { label: 'Month', value: 'month' },
                    { label: 'Year', value: 'year' },
                    { label: 'All', value: 'all' },
                ]}
                onChange={(event) => handleDateChange(event, setDateFilterValue)}
                value={dateFilterValue}
                optionType="button"
                buttonStyle="solid"
            />

            <RangePicker style={{marginLeft: ".5vw"}} />

            <Search
                style={{ width: "27vw", marginLeft: "1vw" }}
                placeholder="Find Transaction"
                onSearch={(value, event) => onSearch(value, event)}
                loading={searchLoading}
                enterButton />
        </Row>
    )
}

export default TransactionTableFilter