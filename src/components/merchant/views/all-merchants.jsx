import { Card, Col, Row, Table, Menu, Checkbox, Dropdown, Button, Form, DatePicker, Popconfirm, Input } from "antd"
import { useState } from "react"
import { Redirect } from "react-router-dom";
import { ExportOutlined } from '@ant-design/icons';
import { onExport } from "../../../core/components/merchants/all-merchants"
import MerchantTableFilter from "../merchant-table-filter"
import MerchantTableDeletePopConfirm from "../merchant-table-delete-pop-confirm";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { filterColumns, flaternInfiniteQueryData } from "../../../core/support/table";
import { fetchAllMerchant, updateMerchant } from "../../../core/api/merchant";
import { DATE_FORMAT, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../../../.env";
import moment from "moment"
import { momentDateToString, toDate } from "../../../core/support/Facade/date";



const defaultColumnsFilter = {
    "Merchant": true,
    "Email": true,
    "Phone": true,
    "Balance": true,
    "Loc Of Use": true,
    "POSID": true,
    "Registered": true,
    "ID Card Number": true,
    "ID Card Type": true,
    "ID Card Expires": false,
    "Home Address": false,
    "GPS Address": false,
    "Date of Birth": false,
    "Level Of Education": true,
    "Next of Kin":false,
    "Next of Kin Phone": false,
    "Relation": false,
    "Action":true
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
        case "nextOfkin":
        case "nextOfkinRelationship":
        case "nextOfKinPhoneNumber":
        case "balance":
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



const AllMerchants = () => {

    const defaultColumns = [
        {
            title: "Merchant",
            dataIndex: "name",
            key: "name",
            editable: true,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            editable: true,

        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            editable: true,

        },
        {
            title: "Balance",
            dataIndex: "balance",
            key: "balance",
            editable: true,

        },
        {
            title: "Loc Of Use",
            dataIndex: "locationOfUse",
            key: "locationOfUse",
            editable: true,

        },
        {
            title: "POSID",
            dataIndex: "posID",
            key: "posID",
            editable: true,

        },
        {
            title: "Next of Kin",
            dataIndex: "nextOfKin",
            key: "nextOfKin",
            editable: true,

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
            title: "Relation",
            dataIndex: "nextOfKinRelationship",
            key: "nextOfKinRelationship",
            editable: true,

        },
        {
            title: "Next of Kin Phone",
            dataIndex: "nextOfKinPhoneNumber",
            key: "nextOfKinPhoneNumber",
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
            title: "Registered",
            dataIndex: "createdAt",
            key: "createdAt",
            editable: true,
            render: (text, record) => (<>{toDate(text)}</>)

        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
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
                        <MerchantTableDeletePopConfirm label={record.name} record={record} />
                    </>)
            }

        },
    ]

    const [columnsFilter, setColumnsFilter] = useState(defaultColumnsFilter)
    const [editingKey, setEditingKey] = useState('');
    const [page, setPage] = useState(DEFAULT_PAGE)
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
    const [filteredData, setFilteredData] = useState(null)
    const [form] = Form.useForm();
    const isEditing = (record) => record.id === editingKey;
    const queryClient = useQueryClient();
    
    const { data, isLoading } = useInfiniteQuery(["merchants", { page, pageSize }], () => fetchAllMerchant({ page, pageSize }), {
        keepPreviousData: true,
        select: data => (
            {
                count: data.pages.slice(-1)[0]?.payload?.count,
                pages: flaternInfiniteQueryData(data)
            }
        )
    })

    const { mutate: mutateUpdate,  isLoading: isUpdateLoading,} = useMutation(updateMerchant, {
        onSuccess: () => queryClient.invalidateQueries("merchants")
    })

    const edit = (record) => {
        form.setFieldsValue({
            ...record, createdAt: moment (record.createdAt), dob: moment(record.dob), expires: moment(record.expires)
        });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
    };

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

            mutateUpdate(updateData);
            setEditingKey("")

        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const handleCheck = (e) => {
        // console.log(e.target)
        let newColumnsFilter = { ...columnsFilter, [e.target.name]: e.target.checked };

        setColumnsFilter(newColumnsFilter);
       
    }

    const handleSearch = (keyword = "") => {
        if (!keyword) {

            setFilteredData(null);
            return
        }
        let pattern = new RegExp(`${keyword}`, 'gi');
        let result = data?.pages?.filter((datum) => {
            for(let key in datum){
               if(datum[key].match(pattern)){
                   return true
               }
            }
            return false;
        })

        setFilteredData(result)
    }

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

    if(data?.pages?.length < 1){
        return <Redirect to="/merchants" />
    }
    return (
        <Row style={{ paddingTop: "5vh" }} justify="center">
            <Col span={22}>
                <Card>
                    <Row justify="space-between" style={{ marginBottom: "15px" }}>
                        <Col span={20}>
                            <MerchantTableFilter onSearch={handleSearch} style={{}} />
                        </Col>
                        <Col>
                            <Dropdown.Button onClick={(event) => onExport("#merchantTableRecords table")} overlay={menu.bind(this, columnsFilter)}><ExportOutlined /> Export</Dropdown.Button>
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
                        style={{ minHeight: "50vh" }}
                        scroll={data?.pages ? { x: "100vw", y: "60vh" } : {}}
                        dataSource={filteredData || data?.pages}
                    />
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default AllMerchants