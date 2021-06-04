import { Button, Popconfirm } from "antd";
import { useState } from "react";

const StaffTablePopConfirm = (props) => {
    const [popConfirmVisibility, setPopConfirmVisibility] = useState(false)
    const [popConfirmLoading, setPopConfirmLoading] = useState(false)

    const showPopconfirm = () => {
        setPopConfirmVisibility(true);
    };

    const handleOk = (x) => {
        console.log()
        setPopConfirmLoading(true);
        setTimeout(() => {
            setPopConfirmVisibility(false);
            setPopConfirmLoading(false)
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setPopConfirmVisibility(false)
    };
    return (

        <Popconfirm
            title={<b>This action is not reversible. <br /> Do you want to continue? </b>}
            visible={popConfirmVisibility}
            onConfirm={() => handleOk()}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ loading: popConfirmLoading }}
            onCancel={() => handleCancel()}
        >
            <Button type="dark" size="small" onClick={() => showPopconfirm()}>Delete</Button>
        </Popconfirm>

    )
}

export default StaffTablePopConfirm;