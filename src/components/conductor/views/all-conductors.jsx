import { Card, Col, Row, Table, Menu, Checkbox, Dropdown, Button } from "antd"
import { useState } from "react"
import { ExportOutlined } from '@ant-design/icons';
import { dummyData, onExport } from "../../../core/components/conductors/all-conductors"
import ConductorTableFilter from "../conductor-table-filter"
import ConductorTablePopConfirm from "../conductor-table-pop-confirm";



const defaultColumnsFilter = {
    "Conductor": true,
    "Conductor Id": true,
    "Balance": true,
    "Loc Of Use": true,
    "POSID": true,
    "Registered": true,
}

const AllConductors = () => {
    const defaultColumns = [
        {
            title: "Conductor",
            dataIndex: "name",
            key: "name",
    
        },
        {
            title: "Conductor Id",
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
                <ConductorTablePopConfirm label={record.name}/>
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
                            <ConductorTableFilter style={{}} />
                        </Col>
                        <Col>
                            <Dropdown.Button onClick={(event) => onExport("#conductorTableRecords table")} overlay={menu.bind(this, columnsFilter)}><ExportOutlined /> Export</Dropdown.Button>
                        </Col>
                    </Row>
                    <Table
                        id="conductorTableRecords"
                        size="small"
                        columns={columns}
                        dataSource={datasource}
                    />
                </Card>
            </Col>
        </Row>
    )
}

export default AllConductors