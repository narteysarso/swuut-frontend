import { Card, Col, Row, Table, Menu, Checkbox, Dropdown, Button } from "antd"
import { useState } from "react"
import { ExportOutlined } from '@ant-design/icons';
import { dummyData, onExport } from "../../../core/components/staff-managment/all-staff"
import StaffTableFilter from "../staff-table-filter"
import StaffTablePopConfirm from "../staff-table-pop-confirm";



const defaultColumnsFilter = {
    "Staff": true,
    "Staff Id": true,
    "Balance": true,
    "Loc Of Use": true,
    "POSID": true,
    "Registered": true,
}

const AllStaff = () => {
    const defaultColumns = [
        {
            title: "Staff",
            dataIndex: "name",
            key: "name",
    
        },
        {
            title: "Staff Id",
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
                <StaffTablePopConfirm label={record.name}/>
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
                            <StaffTableFilter style={{}} />
                        </Col>
                        <Col>
                            <Dropdown.Button onClick={(event) => onExport("#staffTableRecords table")} overlay={menu.bind(this, columnsFilter)}><ExportOutlined /> Export</Dropdown.Button>
                        </Col>
                    </Row>
                    <Table
                        id="staffTableRecords"
                        size="small"
                        columns={columns}
                        dataSource={datasource}
                    />
                </Card>
            </Col>
        </Row>
    )
}

export default AllStaff