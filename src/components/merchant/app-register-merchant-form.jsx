import React  from 'react';
import { Form, Input, Select, Row, Col, Button, DatePicker, Divider } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

const { Option } = Select;

const AppRegisterMerchantForm = () => {
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
              rules={[{ required: true, message: 'Please enter merchant firstname' }]}
            >
              <Input placeholder="Please enter merchant firstname" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastname"
              label="Lastname"
              hasFeedback
              rules={[{ required: true, message: 'Please enter merchant lastname' }]}
            >
              <Input placeholder="Please enter merchant lastname" />
              
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="middlename"
              label="Middlename"
              rules={[{ required: false, message: 'Please enter merchant firstname' }]}
            >
              <Input placeholder="Please enter merchant middlename" />
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
              rules={[{ required: true, message: 'Please enter merchant phone number' }]}
            >
              <Input placeholder="Please enter merchant phone number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              hasFeedback
              rules={[{ required: true, message: 'Please enter merchant email' }]}
            >
              <Input placeholder="Please enter merchant email" />
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
              rules={[{ required: true, message: 'Please enter merchant id card number' }]}
            >
              <Input placeholder="Please enter merchant id card number" />
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
              rules={[{ required: true, message: 'Please enter merchant home address' }]}
            >
              <Input placeholder="Please enter merchant home address" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="gpsAddress"
              label="GPS Address"
              rules={[{ required: false, message: 'Please enter merchant gps address' }]}
            >
              <Input placeholder="Please enter merchant gps address" />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Row gutter={16}>
          <Col span={12}>
          <Form.Item
              name="levelOfEducation"
              label="Level of Education"
              hasFeedback
              rules={[{ required: true, message: 'Please enter merchant level of education' }]}
            >
              <Select placeholder="Please select merchant level of education">
                <Option value="basic">Basic</Option>
                <Option value="cotvet">Cotvet</Option>
                <Option value="degree">Degree</Option>
                <Option value="diploma">Diploma</Option>
                <Option value="secondary">Secondary</Option>
              </Select>
            </Form.Item>
          </Col>
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
        </Row>

        <Row gutter={16}>
          <Col span={12}>
          <Form.Item
              name="nextOfKinRelation"
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
              Register Merchant
          </Button>
          </Form.Item>

        </Row>
      </Form>
    </>
  );
};

export default AppRegisterMerchantForm