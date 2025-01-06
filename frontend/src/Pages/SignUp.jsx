import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminRegister} from "../Redux/admin/action";
import { studentRegister } from "../Redux/student/action";

//css imports
import { message, Space, Spin } from "antd";
import "./SignUp.css";
const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);

  //alert api
  const [messageApi, contextHolder] = message.useMessage();

  //loading state
  const [loading, setLoading] = useState(false);

  //form state
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // login function
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.type === "") {
      return messageApi.open({
        type: "error",
        content: "Please select user type.",
        duration: 3,
      });
    }
    setLoading(true);
    if (formData.type === "admin") {
      dispatch(adminRegister(formData)).then((res) => {
        if (res.message === "Wrong credentials") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Wrong credentials !",
            duration: 3,
          });
        } else if (res.message === "Access Denied") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Your access has been revoked by the admin !",
            duration: 3,
          });
        } else if (res.message === "Error") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Something went wrong, please try again",
            duration: 3,
          });
        } else {
          setLoading(false);
          return navigate("/home");
        }
      });
    }
    if (formData.type === "tutor") {
      dispatch(tutorSignUp(formData)).then((res) => {
        if (res.message === "Wrong credentials") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Wrong credentials !",
            duration: 3,
          });
        } else if (res.message === "Access Denied") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Your access has been revoked by the admin !",
            duration: 3,
          });
        } else if (res.message === "error") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Something went wrong, please try again",
            duration: 3,
          });
        } else {
          setLoading(false);
          return navigate("/home");
        }
      });
    }
    if (formData.type === "student") {
      dispatch(studentSignUp(formData)).then((res) => {
        if (res.message === "Wrong credentials") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Wrong credentials !",
            duration: 3,
          });
        } else if (res.message === "Access Denied") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Your access has been revoked by the admin !",
            duration: 3,
          });
        } else if (res.message === "error") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Something went wrong, please try again",
            duration: 3,
          });
        } else {
          setLoading(false);
          return navigate("/home");
        }
      });
    }
  };

  if (auth.data.isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
 <div className="login">
      <div className="loginContainer">
        <div className="loginImage">
          <img
            src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7863.jpg"
            alt=""
          />
        </div>
        <div className="loginDetail">
          <div>
            <h3>Sign Up</h3>
          </div>

          <div>
            {/* login form  */}
            <form onSubmit={handleFormSubmit}>
              <select name="type" onChange={handleFormChange}>
                <option value="">Select user type</option>
                <option value="admin">Admin</option>
                <option value="tutor">Tutor</option>
                <option value="student">Student</option>
              </select>
               <input
                required
                name="name"
                value={formData.id}
                onChange={handleFormChange}
                type="text"
                placeholder="Enter Name"
              />
              <input
                required
                name="email"
                value={formData.id}
                onChange={handleFormChange}
                type="email"
                placeholder="Enter email"
              />
              <input
                required
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                type="password"
                placeholder="Enter password"
              />
              <button type="submit">CONTINUE</button>
            </form>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Signin here</a>
                  </p>
          </div>
        </div>
      </div>

      {/* loading indicator */}
      {contextHolder}
      {loading ? (
        <Space
          style={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.2)",
            top: "0",
            left: "0",
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
          }}
        >
          <Spin size="large"></Spin>
        </Space>
      ) : null}
    </div>

  );
};

export default SignUp;
