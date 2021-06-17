import React, { useEffect } from 'react';
import { Form, Input, Select, Row, Col, Button, DatePicker, Divider, message } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from 'react-query';
import { DATE_FORMAT } from '../../.env';
import { addMerchant } from '../../core/api/merchant';
import moment from "moment";
import { momentDateToString } from '../../core/support/Facade/date';

const { Option } = Select;
const merchantMessageKey = "merchantMessageKey"

const AppRegisterMerchantForm = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess, reset} = useMutation(addMerchant, {
    onSuccess: () =>{queryClient.invalidateQueries("merchants")},
  })
  const onFinish = (values) => {
  
    let staff = parseStaffData(values)
      
    mutate(staff);
  };

  const parseStaffData = (data) => {
    data.dob = momentDateToString(data.dob)
    data.enrolled = momentDateToString(data.enrolled);
    data.expires = momentDateToString(data.expires)
    return data 
  }

  useEffect(() => {

    if(isSuccess){
      form.resetFields();
      reset(); 
    }

  })

  return (
    <>
      {isLoading && message.loading({content: "Adding Staff...", key: merchantMessageKey })}
      {isSuccess && message.success({content: "Staff Added", key: merchantMessageKey, duration: 2})}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Fullname"
              hasFeedback

              rules={[{ required: true, message: 'Please enter user fullname' }]}
            >
              <Input disabled={isLoading} placeholder="Please enter user fullname" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone Number"
              hasFeedback
              rules={[{ required: true, message: 'Please enter user phone number' }]}
            >
              <Input disabled={isLoading} placeholder="Please enter user phone number" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              hasFeedback
              rules={[{ required: true, message: 'Please enter user email' }]}
            >
              <Input disabled={isLoading} placeholder="Please enter user email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="dob"
              label="Date of birth"
              hasFeedback
              rules={[{ required: true, message: 'Please choose date of birth' }]}
            >
              <DatePicker
                disabled={isLoading}
                style={{ width: '100%' }}
                format={DATE_FORMAT}
                getPopupContainer={trigger => trigger.parentElement}
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider />
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="IdCardType"
              label="Id Card"
              hasFeedback
              rules={[{ required: true, message: 'Please select id card type' }]}
            >
              <Select placeholder="Please select id card type" disabled={isLoading}>
                <Option value="votersID">Voters ID</Option>
                <Option value="passport">Passport</Option>
                <Option value="ghanaCard">Ghana Card</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="IdCardNumber"
              label="ID Card Number"
              hasFeedback
              rules={[{ required: true, message: 'Please enter user id card number' }]}
            >
              <Input disabled={isLoading} placeholder="Please enter user id card number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="expires"
              label="ID Card Expires"
              hasFeedback
              rules={[{ required: true, message: 'Please enter user id card expiry date' }]}
            >
              <DatePicker
                disabled={isLoading}
                style={{ width: '100%' }}
                defaultPickerValue={moment()}
                defaultValue={moment()}

                format={DATE_FORMAT}
                getPopupContainer={trigger => trigger.parentElement}
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="homeAddress"
              label="Home Address"
              hasFeedback
              rules={[{ required: true, message: 'Please enter user home address' }]}
            >
              <Input disabled={isLoading} placeholder="Please enter user home address" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="gpsAddress"
              label="GPS Address"
              rules={[{ required: false, message: 'Please enter user gps address' }]}
            >
              <Input disabled={isLoading} placeholder="Please enter user gps address" />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="nextOfKin"
              label="Next of Kin"
              hasFeedback
              rules={[{ required: true, message: 'Please enter merchant next of Kin' }]}
            >
              <Input placeholder="Please enter merchant next of Kin" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="nextOfKinRelationship"
              label="Next of Kin Relation"
              hasFeedback
              rules={[{ required: true, message: 'Please enter merchant next of Kin Relation' }]}
            >
              <Input placeholder="Please enter merchant next of Kin Relation" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="nextOfKinPhoneNumber"
              label="Next of Kin Phone Number"
              hasFeedback
              rules={[{ required: true, message: 'Please enter merchant next of Kin phone number' }]}
            >
              <Input placeholder="Please enter merchant next of Kin phone number" />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="posID"
              label="POSID"
              rules={[{ required: true, message: 'Please enter POS ID' }]}
            >
             <Input placeholder="Provide POS ID" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="locationOfUse"
              label="Location of Use"
              rules={[{ required: true, message: 'Please enter Location of Use' }]}
            >
             <Input placeholder="Provide Location of Use" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="enrolled"
              label="Enrolled"
              initialValue={moment()}
              rules={[{ required: false, message: 'Please choose the dateTime' }]}
            >
              <DatePicker
                disabled={isLoading}
                style={{ width: '100%' }}
                defaultPickerValue={moment()}
                defaultValue={moment()}
                
                format={DATE_FORMAT}
                getPopupContainer={trigger => trigger.parentElement}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end" >
          <Form.Item style={{ marginRight: "3vw" }}>
            <Button type="dashed" htmlType="reset">
              Cancel
            </Button>
          </Form.Item>

          <Form.Item >
            <Button type="primary" icon={<UserAddOutlined />} htmlType="submit">
              Register Merchant
            </Button>
          </Form.Item>

        </Row>
      </Form>
    </>
  );
};

export default AppRegisterMerchantForm