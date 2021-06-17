import { Card, Col, Row, Table, Menu, Checkbox, Dropdown, Button, Form, Input, Popconfirm, DatePicker } from "antd"
import { useState } from "react"
import {Redirect} from "react-router-dom"
import { ExportOutlined } from '@ant-design/icons';
import { onExport } from "../../../core/components/staff-managment/all-staff"
import StaffTableFilter from "../staff-table-filter"
import StaffTableDeletePopConfirm from "../staff-table-delete-pop-confirm";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { fetchAllStaff, updateStaff } from "../../../core/api/staff";
import { filterColumns, flaternInfiniteQueryData } from "../../../core/support/table";
import { momentDateToString, toDate } from "../../../core/support/Facade/date";
import { DATE_FORMAT } from "../../../.env";
import moment from "moment"




const defaultColumnsFilter = {
    "Staff": true,
    "Email": true,
    "Phone": true,
    "ID Card Number": true,
    "ID Card Type": true,
    "ID Card Expires": false,
    "Home Address": true,
    "GPS Address": false,
    "Date of Birth": false,
    "Level Of Education": true,
    "Enrolled": true,
    "Action": true,
}

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
    const inputNode = inputType === 'date' ? <DatePicker format={DATE_FORMAT}
        getPopupContainer={trigger => trigger.parentElement} placeholder="Select date" /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: isRequired(dataIndex),
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const getInputType = (dataIndex) => {
    switch (dataIndex) {
        case "name":
        case "email":
        case "phone":
        case "homeAddress":
        case "gpsAddress":
        case "IdCardType":
        case "IdCardNumber":
        case "levelOfEducation":
            return "text"

        case "dob":
        case "expires":
        case "createdAt":
            return "date"

        default:
            return "text";
    }
}
const isRequired = (dataIndex) => {
    switch (dataIndex) {
        case "name":
        case "email":
        case "phone":
        case "homeAddress":
        case "IdCardType":
        case "IdCardNumber":
        case "createdAt":
            return true
        case "gpsAddress":
        case "expires":
        case "levelOfEducation":
        case "dob":
            return false

        default:
            return false;
    }
}

const mergedColumns = (columns, isEditing) => columns.map((col) => {
    if (!col.editable) {
        return col;
    }

    return {
        ...col,
        onCell: (record) => ({
            record,
            inputType: getInputType(col.dataIndex),
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
        }),
    };
});



const AllStaff = () => {
    const [editingKey, setEditingKey] = useState('');
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [form] = Form.useForm();
    const isEditing = (record) => record.id === editingKey;
    const queryClient = useQueryClient()
    const { mutate: mutateUpdate,  isLoading: isUpdateLoading,} = useMutation(updateStaff, {
        onSuccess: () => queryClient.invalidateQueries("staffs")
    })

    const edit = (record) => {

        form.setFieldsValue({
            ...record, createdAt: moment(record.createdAt), dob: moment(record.dob), expires: moment(record.expires)
        });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const defaultColumns = [
        {
            title: "Staff",
            dataIndex: "name",
            key: "name",
            editable: true,

        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            editable: true,

        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            editable: true,

        },
        {
            title: "ID Card Number",
            dataIndex: "IdCardNumber",
            key: "IdCardNumber",
            editable: true,

        },
        {
            title: "ID Card Type",
            dataIndex: "IdCardType",
            key: "IdCardType",
            editable: true,

        },
        {
            title: "ID Card Expires",
            dataIndex: "expires",
            key: "expires",
            editable: true,
            render: (text, record) => (<>{toDate(text)}</>)

        },
        {
            title: "Home Address",
            dataIndex: "homeAddress",
            key: "homeAddress",
            editable: true,

        },
        {
            title: "GPS Address",
            dataIndex: "gpsAddress",
            key: "gpsAddress",
            editable: true,

        },
        {
            title: "Date of Birth",
            dataIndex: "dob",
            key: "dob",
            editable: true,
            render: (text, record) => (<>{toDate(text)}</>)

        },
        {
            title: "Level of Education",
            dataIndex: "levelOfEducation",
            key: "levelOfEducation",
            editable: true,

        },
        {
            title: "Enrolled",
            dataIndex: "createdAt",
            key: "createdAt",
            editable: true,
            render: (text, record, index) => (<>{toDate(text)}</>)

        },
        {
            title: "Action",
            dataIndex: "action",
            fixed: "right",
            render: (text, record) => {
                let editable = isEditing(record);

                return editable ? (
                    <>
                        <Button type="link" loading={isUpdateLoading} onClick={() => save(record)} style={{ marginRight: 8, }}>
                            Save
                        </Button>
                        <Popconfirm disabled={isUpdateLoading} title="Sure to cancel?" onConfirm={cancel}>
                            <Button> Cancel </Button>
                        </Popconfirm>
                    </>
                ) :
                    (<>
                        <Button type="link" size="small" disabled={editable} onClick={() => edit(record)}>Edit</Button>
                        <StaffTableDeletePopConfirm label={record.name} record={record} />
                    </>)
            }

        },
    ]

    const [columnsFilter, setColumnsFilter] = useState(defaultColumnsFilter)



    const { data, isLoading, } = useInfiniteQuery(["staffs", { page, pageSize }], () => fetchAllStaff({ page, pageSize }), {
        keepPreviousData: true,
        select: data => (
            {
                count: data.pages.slice(-1)[0]?.payload?.count,
                pages: flaternInfiniteQueryData(data)
            }
        )
    }
    )



    const handleCheck = (e) => {
        let newColumnsFilter = { ...columnsFilter, [e.target.name]: e.target.checked };
        setColumnsFilter(newColumnsFilter);
    }


    const save = async (record) => {
        try {
            const row = await form.getFieldsValue();
            console.log(row);
            // return;
            if (row.createdAt) {
                row.createdAt = momentDateToString(row.createdAt)
            }

            if (row.expires) {
                row.expires = momentDateToString(row.expires)
            }

            if (row.dob) {
                row.dob = momentDateToString(row.dob)
            }

            const updateData = { ...record, ...row }

            // console.log(updateData)
            mutateUpdate(updateData);
            setEditingKey("")

        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };


    const menu = (columns) => {
        var menus = []
        for (let key in columns) {
            menus.push(
                <Menu.Item key={key}>
                    <Checkbox onChange={handleCheck} disabled={key === "Action"} defaultChecked={columns[key]} name={key}>{key}</Checkbox>
                </Menu.Item>
            )
        }

        return <Menu>{menus}</Menu>
    }

    if (data?.pages?.length < 1){
        return <Redirect to="/staffManagment" />
    }
    return (
        <Row style={{ paddingTop: "5vh" }} justify="center">
            <Col span={22}>
                <Card>
                    <Row justify="space-between" style={{ marginBottom: "15px" }}>

                        <Col span={20}>
                            <StaffTableFilter style={{}} />
                        </Col>
                        <Col>
                            <Dropdown.Button onClick={(event) => onExport("#staffTableRecords table")} overlay={menu.bind(this, columnsFilter)}><ExportOutlined /> Export</Dropdown.Button>
                        </Col>
                    </Row>
                    <Form form={form} component={false}>

                        <Table
                            id="staffTableRecords"
                            size="small"
                            loading={isLoading}
                            rowClassName="editable-row"
                            rowKey={(record) => record.id}
                            pagination={{
                                total: data?.count,
                                showSizeChanger: true,
                                pageSize: pageSize,
                                onChange: (page, pageSize) => {
                                    setPage(page)
                                },
                                onShowSizeChange: (currentPage, size) => {
                                    setPageSize(size)
                                }
                            }}
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                            columns={mergedColumns(filterColumns(defaultColumns, columnsFilter), isEditing)}
                            dataSource={data?.pages}
                            style={{minHeight: "50vh"}}
                            scroll={data?.pages ? { x: "100vw", y: "60vh" } : {}}
                        />
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default AllStaff