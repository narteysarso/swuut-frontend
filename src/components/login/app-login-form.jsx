import { Form, Input, Button, Checkbox, Alert, Divider } from 'antd';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const AppLoginForm = () => {
  const [login, setLogin] = useState(false)
  const [loginError, setLoginError] = useState("");
  const [loginLoader, setLoginLoader] = useState(false);

  const onFinish = (values) => {
    setLoginLoader(true)
    setTimeout(() => {
      const shouldLogin = values.email === "admin@mail.com" && values.password === "eb2X3da6";
      shouldLogin ? setLogin(shouldLogin) :  setLoginError("Incorrect email and password combination");
      setLoginLoader(false);

    }, 1000)
    
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (

    login ? <Redirect to="/transactions" /> : 
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>

        <Button type="link" htmlType="button">
          <Link to="/forgotten-password">
          Forgotten password?
          </Link>
        </Button>
      </Form.Item>

      {loginError && <Alert type="error" showIcon message={loginError} closable onClose={()=>setLoginError("")} />}
      <Divider />
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={loginLoader}>
          Log in
        </Button>
      </Form.Item>
    </Form>

    
  );
};

export default AppLoginForm