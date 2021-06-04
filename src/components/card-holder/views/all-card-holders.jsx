import { Table, Row, Col, Card, Space, Menu, Dropdown, Checkbox } from "antd"
import { ExportOutlined } from '@ant-design/icons';
import { dummyData, onExport } from "../../../core/components/card-holders/all-card-holders";

import { useState } from "react";
import CardHolderTableFilter from "../card-holders-table-filter";


const defaultColumns = [
    {
        title: "Card ID",
        dataIndex: "cardID",
        key: "cardID",
        fixed: "left",
    },
    {
        title: "Card Type",
        dataIndex: "card_type",
        key: "card_type",
        fixed: "left"
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name"
    },
    {
        title: "Phone",
        dataIndex: "phone",
        key: "phone"
    },
    {
        title: "Registered",
        dataIndex: "createdAt",
        key: "createdAt",
        fixed: "right"
    },
]

const defaultColumnsFilter = {
    "Card ID": true,
    "Card Type": true,
    "Name": true,
    "Phone": true,
    "Registered": true
}

const AllCardHolders = () => {

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
                    <Space style={{ marginBottom: "15px", display:"flex", justifyContent:"flex-end" }}>
                        <CardHolderTableFilter />

                        <Dropdown.Button onClick={() => onExport("#cardholdersTableRecords table")} overlay={menu.bind(this, columnsFilter)}><ExportOutlined /> Export</Dropdown.Button>
                    </Space>
                    <Table
                        id="cardholdersTableRecords"
                        size="small"
                        columns={columns}
                        dataSource={datasource}
                        // scroll={datasource ? { x: "100vw", y: "60vh" } : {}}
                    />
                </Card>
            </Col>
        </Row>

    )
}

export default AllCardHolders;