import { Card, Col, Row, Table, Menu, Checkbox, Dropdown, Button } from "antd"
import { useState } from "react"
import { ExportOutlined } from '@ant-design/icons';
import { dummyData, onExport } from "../../../core/components/merchants/all-merchants"
import MerchantTableFilter from "../merchant-table-filter"
import MerchantTablePopConfirm from "../merchant-table-pop-confirm";



const defaultColumnsFilter = {
    "Merchant": true,
    "Merchant Id": true,
    "Balance": true,
    "Loc Of Use": true,
    "POSID": true,
    "Registered": true,
}

const AllMerchants = () => {
    const defaultColumns = [
        {
            title: "Merchant",
            dataIndex: "name",
            key: "name",
    
        },
        {
            title: "Merchant Id",
            dataIndex: "id",
            key: "id",
    
        },
        {
            title: "Balance",
            dataIndex: "balance",
            key: "balance",
    
        },
        {
            title: "Loc Of Use",
            dataIndex: "locationOfUse",
            key: "locationOfUse",
    
        },
        {
            title: "POSID",
            dataIndex: "posID",
            key: "posID",
    
        },
        {
            title: "Registered",
            dataIndex: "createdAt",
            key: "createdAt",
    
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (text, record,index) =>
            (<>
                <Button type="link" size="small">Edit</Button>
                <MerchantTablePopConfirm label={record.name}/>
            </>)
    
        },
    ]
    
    const [columns, setColumns] = useState(defaultColumns)
    const [columnsFilter, setColumnsFilter] = useState(defaultColumnsFilter)
    

    
    
    const datasource = dummyData()

    const handleCheck = (e) => {
        // console.log(e.target)
        let newColumnsFilter = { ...columnsFilter, [e.target.name]: e.target.checked };
        let newColumns = defaultColumns.filter(column => newColumnsFilter[column.title])

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

    return (
        <Row style={{ paddingTop: "5vh" }} justify="center">
            <Col span={22}>
                <Card>
                    <Row justify="space-between" style={{marginBottom: "15px"}}>
                        <Col span={20}>
                            <MerchantTableFilter style={{}} />
                        </Col>
                        <Col>
                            <Dropdown.Button onClick={(event) => onExport("#merchantTableRecords table")} overlay={menu.bind(this, columnsFilter)}><ExportOutlined /> Export</Dropdown.Button>
                        </Col>
                    </Row>
                    <Table
                        id="merchantTableRecords"
                        size="small"
                        columns={columns}
                        dataSource={datasource}
                    />
                </Card>
            </Col>
        </Row>
    )
}

export default AllMerchants