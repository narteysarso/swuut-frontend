import React, { useEffect, useRef } from 'react';
import { Form, Input, Select, Row, Col, Button, DatePicker, Divider, message } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import moment from 'moment';
import { DATE_FORMAT } from "../../.env";
import { useMutation, useQueryClient } from 'react-query';
import { addStaff } from '../../core/api/staff';
import { momentDateToString } from '../../core/support/Facade/date';

const { Option } = Select;
const staffMessageKey = "staffMessageKey"
const AppRegisterStaffForm = () => {
  const formRef = useRef();
  const queryClient = useQueryClient()
  const {mutate, isError, isLoading, isSuccess} = useMutation(addStaff, {
    onSuccess: () => queryClient.invalidateQueries("staffs")
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
      formRef.current.resetFields();
    }

  })

  return (
    <>
      {isLoading && message.loading({content: "Adding Staff...", key: staffMessageKey })}
      {isSuccess && message.success({content: "Staff Added", key: staffMessageKey, duration: 2})}
      <Form ref={formRef} layout="vertical" onFinish={onFinish} >
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
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password disabled={isLoading} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="role"
              label="Role"
              hasFeedback
              rules={[{ required: true, message: 'Please select staff role' }]}
            >
              <Select placeholder="Please select staff role" disabled={isLoading}>
                <Option value="administrator">Administrator</Option>
                <Option value="staff">Staff</Option>
              </Select>
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
            <Button
              loading={isLoading}
              type="primary"
              icon={<UserAddOutlined />} htmlType="submit">
              Register Staff
          </Button>
          </Form.Item>

        </Row>
      </Form>
    </>
  );
};

export default AppRegisterStaffForm