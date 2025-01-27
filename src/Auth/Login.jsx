import { Link } from "react-router-dom";
import image from "../assets/header/login.png";
import { Checkbox, Form, Input } from "antd";

const Login = () => {
  const onFinish = async (values) => {
    console.log(values);
  };
  return (
    <div className="min-h-screen grid grid-cols-2 bg-white">
      <div className="flex justify-center items-center">
        <img src={image} alt="" />
      </div>
      <div className="bg-[#EAE9F0] min-h-screen flex items-center justify-center">
        <div className="">
        <div className=" md:px-16 px-5 py-16 bg-white w-[600px] rounded">
          <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Login to Account
          </h2>
          <p className="pb-7">Please enter your email and password to continue</p>
          </div>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input
                placeholder="Enter your Email"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </Form.Item>

            <div className="flex items-center justify-between mb-4">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="text-gray-700">Remember me</Checkbox>
              </Form.Item>
              <Link
                to={"/forgetpassword"}
                className="text-sm text-[#2F799E] hover:underline focus:outline-none"
              >
                Forget password?
              </Link>
            </div>

            <Link to={'/'}>
            <Form.Item>
              <button
                type="submit"
                className="w-full mt-8 py-2 bg-[#2A216D] text-white rounded hover:bg-gray-800 focus:ring-2 focus:ring-gray-500"
              >
                Submit
              </button>
            </Form.Item></Link>
          </Form>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
