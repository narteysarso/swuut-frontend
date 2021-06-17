import { Button, message, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteStaff } from "../../core/api/staff";

const StaffTableDeletePopConfirm = (props) => {
    const [popConfirmVisibility, setPopConfirmVisibility] = useState(false)
 

    const queryClient = useQueryClient();
    const {data, mutate:mutateDelete, isError:isDeleteError, isLoading:isDeleting, isSuccess: isDeleteSuccess, reset} = useMutation(deleteStaff, {
        onSuccess: () => {
            queryClient.invalidateQueries("staffs")
            setPopConfirmVisibility(false);
        }
      })

    const showPopconfirm = () => {
        setPopConfirmVisibility(true);
    };

    const handleOk = (x) => {
       
        mutateDelete(props.record.id);
       
    };

    const handleCancel = () => {
        setPopConfirmVisibility(false)
    };

    useEffect(() => {

        if(isDeleteSuccess){
          reset(); 
        }
    
      }, [isDeleteSuccess, reset])
    return (
        <>
        {(isDeleteSuccess && !isDeleting) && message.success({content:"Staff deleted", key: "staff123456"}, 1, reset)}
        {isDeleteError && message.error({content: data.message, key: "staff123456" })}
        <Popconfirm
            title={<b>This action is not reversible. <br /> Do you want to continue? </b>}
            visible={popConfirmVisibility}
            onConfirm={() => handleOk()}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ loading: isDeleting }}
            onCancel={() => handleCancel()}
        >
            <Button type="dark" size="small" onClick={() => showPopconfirm()}>Delete</Button>
        </Popconfirm>
        </>

    )
}

export default StaffTableDeletePopConfirm;