import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/logininput";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setVisible }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginInfos = {
    email: "",
    password: "",
  };
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email address")
      .max(100),
    password: Yup.string().required("Password is required"),
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          email,
          password,
        }
      );
      setError("");

      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className='login_wrap'>
      <div className='login_1'>
        <img src='../../icons/facebook.svg' alt='' />
        <span>
          Facebook helps you connect and share with the people in youre life.
        </span>
      </div>
      <div className='login_2'>
        <div className='login_2_wrap'>
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type='text'
                  name='email'
                  placeholder='Email Address'
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type='password'
                  name='password'
                  placeholder='Password'
                  bottom
                  onChange={handleLoginChange}
                />
                <button type='submit' className='blue_btn'>
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <Link to='/reset' className='forgot_password'>
            Forgotten password?
          </Link>
          {error && <div className='error_text'>{error}</div>}
          <div className='sign_splitter'></div>
          <button
            onClick={() => setVisible("true")}
            className='blue_btn open_signup'
          >
            Create Account
          </button>
        </div>
        <Link to='/' className='sign_extra'>
          <b>Create a Page</b> for celebrity, brand, and bussiness.
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
