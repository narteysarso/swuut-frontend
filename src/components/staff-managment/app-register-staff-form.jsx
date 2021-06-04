import React  from 'react';
import { Form, Input, Select, Row, Col, Button, DatePicker, Divider } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

const { Option } = Select;

const AppRegisterStaffForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    form.resetFields();
  };

  return (
    <>
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="firstname"
              label="Firstname"
              hasFeedback
              rules={[{ required: true, message: 'Please enter user firstname' }]}
            >
              <Input placeholder="Please enter user firstname" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastname"
              label="Lastname"
              hasFeedback
              rules={[{ required: true, message: 'Please enter user lastname' }]}
            >
              <Input placeholder="Please enter user lastname" />
              
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="middlename"
              label="Middlename"
              rules={[{ required: false, message: 'Please enter user firstname' }]}
            >
              <Input placeholder="Please enter user middlename" />
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
                style={{ width: '100%' }}
                getPopupContainer={trigger => trigger.parentElement}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              hasFeedback
              rules={[{ required: true, message: 'Please enter user phone number' }]}
            >
              <Input placeholder="Please enter user phone number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              hasFeedback
              rules={[{ required: true, message: 'Please enter user email' }]}
            >
              <Input placeholder="Please enter user email" />
            </Form.Item>
          </Col>
        </Row>

        <Divider />
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="idCardType"
              label="Id Card"
              hasFeedback
              rules={[{ required: true, message: 'Please select id card type' }]}
            >
              <Select placeholder="Please select id card type">
                <Option value="votersID">Voters ID</Option>
                <Option value="passport">Passport</Option>
                <Option value="ghanaCard">Ghana Card</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="idCardNumber"
              label="ID Card Number"
              hasFeedback
              rules={[{ required: true, message: 'Please enter user id card number' }]}
            >
              <Input placeholder="Please enter user id card number" />
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
              <Input placeholder="Please enter user home address" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="gpsAddress"
              label="GPS Address"
              rules={[{ required: false, message: 'Please enter user gps address' }]}
            >
              <Input placeholder="Please enter user gps address" />
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
              <Input.Password />
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
              name="approver"
              label="Approver"
              rules={[{ required: true, message: 'Please choose the approver' }]}
            >
              <Select placeholder="Please choose the approver">
                <Option value="raphael">Raphael</Option>
                <Option value="felix">Felix</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="dateTime"
              label="DateTime"
              rules={[{ required: true, message: 'Please choose the dateTime' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                getPopupContainer={trigger => trigger.parentElement}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: 'please enter url description',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="please enter url description" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end" >
          <Form.Item style={{marginRight: "3vw"}}>
            <Button type="dashed" htmlType="reset">
              Cancel
          </Button>
          </Form.Item>

          <Form.Item >
            <Button type="primary" icon={<UserAddOutlined />} htmlType="submit">
              Register Staff
          </Button>
          </Form.Item>

        </Row>
      </Form>
    </>
  );
};

export default AppRegisterStaffForm