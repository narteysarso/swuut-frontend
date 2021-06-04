import React from 'react';
import { Form, Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';

const AppForgottenPasswordForm = () => {
    const [form] = Form.useForm();

    return (
        <Form form={form} name="horizontal_login" layout="inline">
            <Form.Item
                style={{ width: "35vw" }}

                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input size="large" type="email" prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item shouldUpdate>
                {() => (
                    <Button
                        size="large"
                        type="primary"
                        htmlType="submit"
                        disabled={
                            !form.isFieldsTouched(true) ||
                            !!form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Submit
                    </Button>
                )}
            </Form.Item>
        </Form>
    );
};

export default AppForgottenPasswordForm;