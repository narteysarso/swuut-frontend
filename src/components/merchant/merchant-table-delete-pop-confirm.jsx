import { Button, message, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteMerchant } from "../../core/api/merchant";

const MerchantTableDeletePopConfirm = (props) => {
    const [popConfirmVisibility, setPopConfirmVisibility] = useState(false)

    const queryClient = useQueryClient();
    const {data, mutate:mutateDelete, isError:isDeleteError, isLoading:isDeleting, isSuccess: isDeleteSuccess, reset} = useMutation(deleteMerchant, {
        onSuccess: () => {
            queryClient.invalidateQueries("merchants")
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
        console.log('Clicked cancel button');
        setPopConfirmVisibility(false)
    };

    useEffect(() => {

        if(isDeleteSuccess){
          reset(); 
        }
    
      },[isDeleteSuccess, reset])
    return (
        <>
        {(isDeleteSuccess && !isDeleting) && message.success({content:"Merchant deleted", key: "merchant123456"}, 1, reset)}
        {isDeleteError && message.error({content: data.message,key: "merchant123456"})}
        <Popconfirm
            title={<b>This action is not reversible. <br /> Do you want to continue? </b>}
            visible={popConfirmVisibility}
            onConfirm={() => handleOk()}
            okButtonProps={{ loading: isDeleting }}
            onCancel={() => handleCancel()}
            okText="Yes"
            cancelText="No"
        >
            <Button type="dark" size="small" onClick={() => showPopconfirm()}>Delete</Button>
        </Popconfirm>
        </>

    )
}

export default MerchantTableDeletePopConfirm