import { Table, Row, Col, Card, Space, Menu, Dropdown, Checkbox } from "antd"
import { ExportOutlined } from '@ant-design/icons';
import { dummyData, onExport } from "../../../core/components/transactions/all-transactions";

import TransactionTableFilter from "../transactions-table-filter";
import { useState } from "react";


const defaultColumns = [
    {
        title: "POS ID",
        dataIndex: "posID",
        key: "posID",
        fixed: "left",
    },
    {
        title: "Transaction Type",
        dataIndex: "trans_type",
        key: "trans_type",
        fixed: "left"
    },
    {
        title: "Transaction ID",
        dataIndex: "trans_id",
        key: "trans_id",
        ellipsis: true
    },

    {
        title: "Amount",
        dataIndex: "amount",
        key: "amount"
    },
    {
        title: "From",
        dataIndex: "from_model_type",
        key: "from_model_type"
    },
    {
        title: "From Name",
        dataIndex: "from_model_name",
        key: "from_model_name"
    },
    {
        title: "From ID",
        dataIndex: "from_model_id",
        key: "from_model_id",
        ellipsis: true
    },
    {
        title: "To",
        dataIndex: "to_model_type",
        key: "to_model_type",
        
    },
    {
        title: "To Name",
        dataIndex: "to_model_name",
        key: "to_model_name",
    },
    {
        title: "To ID",
        dataIndex: "to_model_id",
        key: "to_model_id",
        fixed: "right",
        ellipsis: true
    },
    {
        title: "Date",
        dataIndex: "createdAt",
        key: "createdAt",
        width: "80px",
        fixed: "right"
    },
]

const defaultColumnsFilter = {
    "POS ID": true,
    "Transaction Type": true,
    "Transaction ID": true,
    "Amount": true,
    "From": true,
    "From Name": true,
    "From ID": true,
    "To": true,
    "To Name": true,
    "To ID": true,
    "Date": true
}

const AllTransactions = () => {

    const [columns, setColumns] = useState(defaultColumns)
    const [columnsFilter, setColumnsFilter] = useState(defaultColumnsFilter)


    const handleCheck = (e) => {
        // console.log(e.target)
        let newColumnsFilter = {...columnsFilter, [e.target.name]: e.target.checked};
        let newColumns = defaultColumns.filter(column => newColumnsFilter[column.title] )
       
        setColumnsFilter(newColumnsFilter);
        setColumns(newColumns)
    }

    const menu = (columns) => {
        var menus = []
        for (let key in columns) {
            menus.push(
                <Menu.Item key={key}>
                    <Checkbox onChange={handleCheck} defaultChecked={columns[key]} name={key}>{key}</Checkbox>
                </Menu.Item>
            )
        }

        return <Menu>{menus}</Menu>
    }

    const datasource = dummyData();

    return (
        <Row style={{ paddingTop: "5vh" }} justify="center">
            <Col span={22}>
                <Card>
                    <Space style={{ marginBottom: "15px", display:"flex", justifyContent:"space-between" }}>
                        <TransactionTableFilter />

                        <Dropdown.Button onClick={() => onExport("#transactionTableRecords table")} overlay={menu.bind(this, columnsFilter)}><ExportOutlined /> Export</Dropdown.Button>
                    </Space>
                    <Table
                        id="transactionTableRecords"
                        size="small"
                        columns={columns}
                        dataSource={datasource}
                        scroll={datasource ? { x: "100vw", y: "60vh" } : {}}
                    />
                </Card>
            </Col>
        </Row>

    )
}

export default AllTransactions;